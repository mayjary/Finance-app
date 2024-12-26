import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface FinancesState {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
}

const initialState: FinancesState = {
  balance: 5000,
  income: 3000,
  expenses: 2000,
  transactions: [],
};

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    updateIncome: (state, action: PayloadAction<number>) => {
      state.income = action.payload;
      state.balance = state.income - state.expenses;
    },
    updateExpenses: (state, action: PayloadAction<number>) => {
      state.expenses = action.payload;
      state.balance = state.income - state.expenses;
    },
    addIncome: (state, action: PayloadAction<number>) => {
      state.income += action.payload;
      state.balance += action.payload;
    },
    addExpense: (state, action: PayloadAction<number>) => {
      state.expenses += action.payload;
      state.balance -= action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      if (action.payload.type === 'income') {
        state.income += action.payload.amount;
        state.balance += action.payload.amount;
      } else {
        state.expenses += action.payload.amount;
        state.balance -= action.payload.amount;
      }
    },
  },
});

export const { updateBalance, updateIncome, updateExpenses, addIncome, addExpense, addTransaction } = financesSlice.actions;
export default financesSlice.reducer;

