import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './src/redux/store';
import { Home, DollarSign, PieChart, Settings } from 'react-native-feather';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import IncomeScreen from './src/screens/IncomeScreen';
import ExpenseScreen from './src/screens/ExpenseScreen';
import BudgetScreen from './src/screens/BudgetScreen';
import SavingsScreen from './src/screens/SavingsScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Main: undefined;
  Income: undefined;
  Expense: undefined;
  Reports: undefined;
  Goals: undefined;
  Budget: undefined;
  Savings: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Budget: undefined;
  Savings: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainTabs = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Dashboard':
              return <Home stroke={color} width={size} height={size} />;
            case 'Budget':
              return <DollarSign stroke={color} width={size} height={size} />;
            case 'Savings':
              return <PieChart stroke={color} width={size} height={size} />;
            case 'Settings':
              return <Settings stroke={color} width={size} height={size} />;
          }
        },
        tabBarActiveTintColor: isDarkMode ? '#ffffff' : '#040343',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#040343' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? '#1a1a5c' : '#e5e5e5',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: isDarkMode ? '#040343' : '#ffffff',
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#040343',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Savings" component={SavingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppWrapper = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Income" component={IncomeScreen} />
          <Stack.Screen name="Expense" component={ExpenseScreen} />
          <Stack.Screen name="Reports" component={ReportsScreen} />
          <Stack.Screen name="Goals" component={GoalsScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040343',
  },
});

export default App;

