// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import profileReducer from './profileSlice';
import orderReducer from './orderSlice';
import inventoryReducer from './inventorySlice';
import manufacturerRegistrationReducer from './Manufacturerregistrationslice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    profile: profileReducer,
    orders: orderReducer,
    inventory: inventoryReducer,
    manufacturerRegistration: manufacturerRegistrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});