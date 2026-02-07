import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/api';

// Register Manufacturer Action
export const registerManufacturer = createAsyncThunk(
  'manufacturerRegistration/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/manufacturer/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { success, message, data } = response.data;

      if (!success) {
        return rejectWithValue(message || 'Registration failed');
      }

      return { success: true, message, data };
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Registration failed. Please try again.';
      return rejectWithValue(msg);
    }
  }
);

// Send OTP for verification during registration
export const sendRegistrationOtp = createAsyncThunk(
  'manufacturerRegistration/sendOtp',
  async (phone, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/manufacturer/send-otp', { phone });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
  }
);

// Verify OTP during registration
export const verifyRegistrationOtp = createAsyncThunk(
  'manufacturerRegistration/verifyOtp',
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/manufacturer/verify-otp', { phone, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid OTP');
    }
  }
);

const manufacturerRegistrationSlice = createSlice({
  name: 'manufacturerRegistration',
  initialState: {
    loading: false,
    error: null,
    message: null,
    otpSent: false,
    otpVerified: false,
    registrationSuccess: false,
    registeredData: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    resetRegistration: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.otpSent = false;
      state.otpVerified = false;
      state.registrationSuccess = false;
      state.registeredData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Manufacturer
      .addCase(registerManufacturer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.message = action.payload.message || 'Registration successful!';
        state.registeredData = action.payload.data;
      })
      .addCase(registerManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
      })

      // Send OTP
      .addCase(sendRegistrationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendRegistrationOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        state.message = 'OTP sent successfully!';
      })
      .addCase(sendRegistrationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.otpSent = false;
      })

      // Verify OTP
      .addCase(verifyRegistrationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegistrationOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
        state.message = 'OTP verified successfully!';
      })
      .addCase(verifyRegistrationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.otpVerified = false;
      });
  },
});

export const { clearError, clearMessage, resetRegistration } = manufacturerRegistrationSlice.actions;
export default manufacturerRegistrationSlice.reducer;