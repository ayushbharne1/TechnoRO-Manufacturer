import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/api';

//Product - Get All
export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Filter out empty/undefined params (backend validation rejects empty 'search')
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
      );
      // Apply defaults if not provided
      if (!filteredParams.page) filteredParams.page = 1;
      if (!filteredParams.limit) filteredParams.limit = 10;

      const response = await axiosInstance.get('/api/manufacturer/product', { params: filteredParams });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    pagination: { total: 0, page: 1, pages: 0, limit: 10 },
    success: false,
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload?.success ?? true;
        state.products = action.payload?.data ?? action.payload ?? [];
        state.pagination = action.payload?.pagination ?? state.pagination;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = productSlice.actions;
export default productSlice.reducer;
