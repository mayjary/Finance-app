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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Income</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
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
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
              <Text style={styles.transactionCategory}>{item.category}</Text>
              <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#fff',
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
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
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

