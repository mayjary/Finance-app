import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from '../../App';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Dashboard'>,
  StackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { balance, income, expenses } = useSelector((state: RootState) => state.finances);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Finance Manager Dashboard</Text>
        
        <View style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <Text style={[styles.cardTitle, isDarkMode ? styles.darkText : styles.lightText]}>Current Balance</Text>
          <Text style={[styles.amount, isDarkMode ? styles.darkText : styles.lightText]}>${balance.toFixed(2)}</Text>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.card, styles.halfCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, isDarkMode ? styles.darkText : styles.lightText]}>Income</Text>
            <Text style={[styles.amount, styles.incomeAmount]}>${income.toFixed(2)}</Text>
          </View>
          <View style={[styles.card, styles.halfCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, isDarkMode ? styles.darkText : styles.lightText]}>Expenses</Text>
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
        
        <TouchableOpacity style={styles.reportButton} onPress={() => navigateTo('Reports')}>
          <Text style={styles.buttonText}>View Reports</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#040343',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Add padding at the bottom to ensure content is visible above tab bar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lightText: {
    color: '#040343',
  },
  darkText: {
    color: '#ffffff',
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: '#040343',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  reportButton: {
    backgroundColor: '#040343',
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

