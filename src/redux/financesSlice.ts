import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
  balance: 0,
  income: 0,
  expenses: 0,
  transactions: [],
};

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
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
    editTransaction: (state, action: PayloadAction<{ id: string; amount: number; category: string }>) => {
      const transaction = state.transactions.find(t => t.id === action.payload.id);
      if (transaction) {
        const oldAmount = transaction.amount;
        transaction.amount = action.payload.amount;
        transaction.category = action.payload.category;

        if (transaction.type === 'income') {
          state.income = state.income - oldAmount + action.payload.amount;
        } else {
          state.expenses = state.expenses - oldAmount + action.payload.amount;
        }
        state.balance = state.income - state.expenses;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const transaction = state.transactions.find(t => t.id === action.payload);
      if (transaction) {
        if (transaction.type === 'income') {
          state.income -= transaction.amount;
        } else {
          state.expenses -= transaction.amount;
        }
        state.balance = state.income - state.expenses;
        state.transactions = state.transactions.filter(t => t.id !== action.payload);
      }
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } = financesSlice.actions;
export default financesSlice.reducer;

