// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import profileReducer from './profileSlice';
import orderReducer from './orderSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    profile: profileReducer,
    // Orders slice - used by OrderList and related pages
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});