import { configureStore } from '@reduxjs/toolkit';
import summaryReducer from './slices/summarySlice';

export const store = configureStore({
  reducer: {
    summary: summaryReducer,
  },
});
