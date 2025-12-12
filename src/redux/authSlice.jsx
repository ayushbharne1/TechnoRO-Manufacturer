import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://ro-service-engineer-be.onrender.com/api/vendor';

// 1. Login Action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);
      
      if(response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// 2. Send OTP Action
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-pass/send-otp`, { phone: mobileNumber });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
  }
);

// 3. Verify OTP Action
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-pass/verify-otp`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid OTP');
    }
  }
);

// 4. Reset Password Action
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/reset-pass`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { 
        state.isLoading = false; 
        state.token = action.payload.token; 
      })
      .addCase(loginUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      // Send OTP
      .addCase(sendOtp.pending, (state) => { state.isLoading = true; state.error = null; state.message = null; })
      .addCase(sendOtp.fulfilled, (state) => { state.isLoading = false; state.message = "OTP Sent Successfully!"; })
      .addCase(sendOtp.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(verifyOtp.fulfilled, (state) => { state.isLoading = false; state.message = "OTP Verified!"; })
      .addCase(verifyOtp.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      // Reset Password
      .addCase(resetPassword.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.isLoading = false; state.message = "Password Reset Successful!"; })
      .addCase(resetPassword.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  },
});

export const { logout, clearMessage } = authSlice.actions;
export default authSlice.reducer;