import { configureStore } from '@reduxjs/toolkit'
import profile from './slice/profileSlice';
import order from './slice/orderSlice';

export const store = configureStore({
  reducer: {
    profile,
    order,
  },
})