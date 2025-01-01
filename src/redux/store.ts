import { configureStore } from '@reduxjs/toolkit';
import financesReducer from './financesSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    finances: financesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

