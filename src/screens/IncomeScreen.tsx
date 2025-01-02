import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addTransaction, editTransaction, deleteTransaction } from '../redux/financesSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type IncomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Income'>;

type Props = {
  navigation: IncomeScreenNavigationProp;
};

const IncomeScreen: React.FC<Props> = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const incomeTransactions = useSelector((state: RootState) => 
    state.finances.transactions.filter(t => t.type === 'income')
  );
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleAddIncome = () => {
    if (amount && category) {
      if (editingId) {
        dispatch(editTransaction({
          id: editingId,
          amount: parseFloat(amount),
          category
        }));
        setEditingId(null);
      } else {
        dispatch(addTransaction({
          id: Date.now().toString(),
          amount: parseFloat(amount),
          category,
          date: new Date().toISOString(),
          type: 'income'
        }));
      }
      setAmount('');
      setCategory('');
    }
  };

  const handleEdit = (transaction: { id: string; amount: number; category: string }) => {
    setEditingId(transaction.id);
    setAmount(transaction.amount.toString());
    setCategory(transaction.category);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => dispatch(deleteTransaction(id)) }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Income</Text>
      <View style={[styles.inputContainer, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder="Amount"
          placeholderTextColor={isDarkMode ? '#999' : '#666'}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder="Category"
          placeholderTextColor={isDarkMode ? '#999' : '#666'}
          value={category}
          onChangeText={setCategory}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
          <Text style={styles.buttonText}>{editingId ? 'Update Income' : 'Add Income'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={incomeTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.transactionItem, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <View>
              <Text style={[styles.transactionAmount, isDarkMode ? styles.darkText : styles.lightText]}>${item.amount.toFixed(2)}</Text>
              <Text style={[styles.transactionCategory, isDarkMode ? styles.darkText : styles.lightText]}>{item.category}</Text>
              <Text style={[styles.transactionDate, isDarkMode ? styles.darkText : styles.lightText]}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#040343',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightText: {
    color: '#040343',
  },
  darkText: {
    color: '#ffffff',
  },
  inputContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lightCard: {
    backgroundColor: '#ffffff',
  },
  darkCard: {
    backgroundColor: '#1a1a5c',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  lightInput: {
    borderColor: '#ddd',
    color: '#040343',
  },
  darkInput: {
    borderColor: '#333',
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#040343',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  transactionCategory: {
    fontSize: 16,
  },
  transactionDate: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#2196F3',
    marginRight: 10,
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#F44336',
    fontWeight: 'bold',
  },
});

export default IncomeScreen;

