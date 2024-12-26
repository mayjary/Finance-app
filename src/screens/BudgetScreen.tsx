import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

const BudgetScreen = () => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.finances.transactions.filter(t => t.type === 'expense'));

  // This is a placeholder. You'll need to implement budget-related actions and reducers.
  const budgets = [
    { category: 'Food', limit: 500 },
    { category: 'Transportation', limit: 200 },
    { category: 'Entertainment', limit: 100 },
  ];

  const handleAddBudget = () => {
    // Implement adding a new budget
    console.log('Add budget:', category, limit);
  };

  const calculateSpentAmount = (category: string) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Limit"
          value={limit}
          onChangeText={setLimit}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBudget}>
          <Text style={styles.buttonText}>Add Budget</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => {
          const spentAmount = calculateSpentAmount(item.category);
          const percentage = (spentAmount / item.limit) * 100;
          return (
            <View style={styles.budgetItem}>
              <Text style={styles.budgetCategory}>{item.category}</Text>
              <Text style={styles.budgetAmount}>${spentAmount.toFixed(2)} / ${item.limit}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${percentage}%` }]} />
              </View>
            </View>
          );
        }}
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
  budgetItem: {
    marginBottom: 15,
  },
  budgetCategory: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  budgetAmount: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E5E5EA',
    borderRadius: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CD964',
    borderRadius: 5,
  },
});

export default BudgetScreen;

