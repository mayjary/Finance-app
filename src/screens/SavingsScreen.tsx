import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

const SavingsScreen = () => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const dispatch = useDispatch();

  // This is a placeholder. You'll need to implement savings-related actions and reducers.
  const savingsGoals = [
    { name: 'Emergency Fund', target: 5000, current: 2000 },
    { name: 'Vacation', target: 2000, current: 500 },
    { name: 'New Car', target: 10000, current: 3000 },
  ];

  const handleAddSavingsGoal = () => {
    // Implement adding a new savings goal
    console.log('Add savings goal:', goalName, targetAmount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savings Goals</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Goal Name"
          value={goalName}
          onChangeText={setGoalName}
        />
        <TextInput
          style={styles.input}
          placeholder="Target Amount"
          value={targetAmount}
          onChangeText={setTargetAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddSavingsGoal}>
          <Text style={styles.buttonText}>Add Savings Goal</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={savingsGoals}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const percentage = (item.current / item.target) * 100;
          return (
            <View style={styles.goalItem}>
              <Text style={styles.goalName}>{item.name}</Text>
              <Text style={styles.goalAmount}>${item.current.toFixed(2)} / ${item.target}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${percentage}%` }]} />
              </View>
              <Text style={styles.percentage}>{percentage.toFixed(1)}%</Text>
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
    backgroundColor: '#5856D6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalItem: {
    marginBottom: 20,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalAmount: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E5E5EA',
    borderRadius: 5,
    marginBottom: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#5856D6',
    borderRadius: 5,
  },
  percentage: {
    fontSize: 14,
    color: '#5856D6',
    textAlign: 'right',
  },
});

export default SavingsScreen;

