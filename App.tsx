import 'react-native-gesture-handler';  // This import must be first!
import React from 'react';
import { View, Text, SafeAreaView, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import IncomeScreen from './src/screens/IncomeScreen';
import ExpenseScreen from './src/screens/ExpenseScreen';
import BudgetScreen from './src/screens/BudgetScreen';
import SavingsScreen from './src/screens/SavingsScreen';
import ReportsScreen from './src/screens/ReportsScreen';

LogBox.ignoreAllLogs(); // Ignore all log notifications

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Income: undefined;
  Expense: undefined;
  Budget: undefined;
  Savings: undefined;
  Reports: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Income" component={IncomeScreen} />
          <Stack.Screen name="Expense" component={ExpenseScreen} />
          <Stack.Screen name="Budget" component={BudgetScreen} />
          <Stack.Screen name="Savings" component={SavingsScreen} />
          <Stack.Screen name="Reports" component={ReportsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

