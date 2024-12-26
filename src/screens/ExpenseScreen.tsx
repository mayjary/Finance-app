import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addTransaction } from '../redux/financesSlice';

const ExpenseScreen = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const expenseTransactions = useSelector((state: RootState) => 
    state.finances.transactions.filter(t => t.type === 'expense')
  );

  const handleAddExpense = () => {
    if (amount && category) {
      dispatch(addTransaction({
        id: Date.now().toString(),
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString(),
        type: 'expense'
      }));
      setAmount('');
      setCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={expenseTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionAmount}>-${item.amount.toFixed(2)}</Text>
            <Text style={styles.transactionCategory}>{item.category}</Text>
            <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
  addButton: {
    backgroundColor: '#FF3B30',
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
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  transactionCategory: {
    fontSize: 16,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default ExpenseScreen;

