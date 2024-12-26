import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PieChart } from 'react-native-chart-kit';

const ReportsScreen = () => {
  const transactions = useSelector((state: RootState) => state.finances.transactions);

  const incomeTotal = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieChartData = Object.entries(expensesByCategory).map(([name, value], index) => ({
    name,
    population: value,
    color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Reports</Text>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Income</Text>
          <Text style={styles.summaryValue}>${incomeTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Expenses</Text>
          <Text style={styles.summaryValue}>${expenseTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Net</Text>
          <Text style={styles.summaryValue}>${(incomeTotal - expenseTotal).toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Expenses by Category</Text>
      <PieChart
        data={pieChartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ReportsScreen;

