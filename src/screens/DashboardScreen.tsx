import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { balance, income, expenses } = useSelector((state: RootState) => state.finances);

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Finance Manager Dashboard</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Balance</Text>
          <Text style={styles.amount}>${balance.toFixed(2)}</Text>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardTitle}>Income</Text>
            <Text style={[styles.amount, styles.incomeAmount]}>${income.toFixed(2)}</Text>
          </View>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardTitle}>Expenses</Text>
            <Text style={[styles.amount, styles.expenseAmount]}>${expenses.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigateTo('Income')}>
            <Text style={styles.buttonText}>Add Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateTo('Expense')}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigateTo('Budget')}>
            <Text style={styles.buttonText}>Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigateTo('Savings')}>
            <Text style={styles.buttonText}>Savings</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.reportButton} onPress={() => navigateTo('Reports')}>
          <Text style={styles.buttonText}>View Reports</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfCard: {
    width: '48%',
  },
  incomeAmount: {
    color: '#4CD964',
  },
  expenseAmount: {
    color: '#FF3B30',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  reportButton: {
    backgroundColor: '#5856D6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;

