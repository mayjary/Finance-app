import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addTransaction } from '../redux/financesSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type IncomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Income'>;

type Props = {
  navigation: IncomeScreenNavigationProp;
};

const IncomeScreen: React.FC<Props> = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const incomeTransactions = useSelector((state: RootState) => 
    state.finances.transactions.filter(t => t.type === 'income')
  );

  const handleAddIncome = () => {
    if (amount && category) {
      dispatch(addTransaction({
        id: Date.now().toString(),
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString(),
        type: 'income'
      }));
      setAmount('');
      setCategory('');
    }
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
          <Text style={styles.buttonText}>Add Income</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={incomeTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
            <Text style={styles.transactionCategory}>{item.category}</Text>
            <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CD964',
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CD964',
  },
  transactionCategory: {
    fontSize: 16,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default IncomeScreen;

