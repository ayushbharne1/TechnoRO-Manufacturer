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

// Product - Create
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      // If `productData` is `FormData`, ensure axios will set proper headers.
      const config = productData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const response = await axiosInstance.post('/api/manufacturer/product', productData, config);
      return response.data;
    } catch (error) {
      // prefer structured backend errors if present (pass along full payload)
      if (error.response?.data) return rejectWithValue(error.response.data);
      const errMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to create product';
      return rejectWithValue({ message: errMsg });
    }
  }
);

// Product - Get By ID
export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/manufacturer/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch product' });
    }
  }
);

// Product - Update
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const config = productData instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const response = await axiosInstance.put(`/api/manufacturer/product/${productId}`, productData, config);
      return response.data;
    } catch (error) {
      if (error.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue({ message: error.response?.data?.message || 'Failed to update product' });
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    pagination: { total: 0, page: 1, pages: 0, limit: 10 },
    productDetail: null,
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
      
      // Create product
      builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload?.success ?? true;
        state.message = action.payload?.message ?? 'Product created successfully';
        // If backend returns created product in `data`, add it to list
        const created = action.payload?.data;
        if (created) {
          // normalize id fields
          if (!created.id && created._id) created.id = created._id;
          // add to the beginning of the products list
          state.products = [created, ...(state.products || [])];
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });

      // get by id
      builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.productDetail = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload?.data ?? action.payload ?? null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

      // update product
      builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload?.success ?? true;
        state.message = action.payload?.message ?? 'Product updated successfully';
        const updated = action.payload?.data;
        if (updated) {
          if (!updated.id && updated._id) updated.id = updated._id;
          state.productDetail = updated;
          state.products = (state.products || []).map((p) => {
            const pid = p.id || p._id;
            const uid = updated.id || updated._id;
            return pid === uid ? updated : p;
          });
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearMessage } = productSlice.actions;
export default productSlice.reducer;
