import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/api';

// 1. Login Action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/manufacturer/login', {
        phone: credentials.phone,
        password: credentials.password,
      });

      const { token, manufacturer, success, message } = response.data;

      if (!success) return rejectWithValue(message || 'Login failed');
      if (!token) return rejectWithValue('Token not received from server');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(manufacturer ?? null));

      // STORE PHONE FROM manufacturer OBJECT (FIX)
      const phone = response.data?.manufacturer?.phone;
      const id = response.data?.manufacturer?._id;

      if (phone) localStorage.setItem("phone", phone);
      if (id) localStorage.setItem("id", id);
      return { token, user: manufacturer, success: true };
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Login failed';
      return rejectWithValue(msg);
    }
  }
);

// 2. Send OTP Action
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/manufacturer/forgot-pass/send-otp', { phone: mobileNumber });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
  }
);

// ✅ Verify Token
export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || 'null');

      if (!token || !user) return rejectWithValue('No session found');
      return { token, user, success: true };
    } catch (error) {
      return rejectWithValue('Invalid token or user data');
    }
  }
);

// ✅ Logout User
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // window.location.href = '/auth/login';
  return null;
});

// 3. Verify OTP Action
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/manufacturer/forgot-pass/verify-otp', data);
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
      const response = await axiosInstance.post('/api/manufacturer/reset-pass', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    isLoading: false,
    error: null,
    isVerifying: false,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.isLoading = false; state.error = action.payload; state.isAuthenticated = false; })

      // Verify token
      .addCase(verifyToken.pending, (state) => { state.isVerifying = true; })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isVerifying = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verifyToken.rejected, (state) => { state.isVerifying = false; state.isAuthenticated = false; state.user = null; state.token = null; })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; state.token = null; state.isAuthenticated = false; })

      // Send OTP
      .addCase(sendOtp.pending, (state) => { state.loading = true; state.isLoading = true; state.error = null; state.message = null; })
      .addCase(sendOtp.fulfilled, (state) => { state.loading = false; state.isLoading = false; state.message = "OTP Sent Successfully!"; })
      .addCase(sendOtp.rejected, (state, action) => { state.loading = false; state.isLoading = false; state.error = action.payload; })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => { state.loading = true; state.isLoading = true; state.error = null; })
      .addCase(verifyOtp.fulfilled, (state) => { state.loading = false; state.isLoading = false; state.message = "OTP Verified!"; })
      .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.isLoading = false; state.error = action.payload; })

      // Reset Password
      .addCase(resetPassword.pending, (state) => { state.loading = true; state.isLoading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.loading = false; state.isLoading = false; state.message = "Password Reset Successful!"; })
      .addCase(resetPassword.rejected, (state, action) => { state.loading = false; state.isLoading = false; state.error = action.payload; });
  },
});

export const { clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;