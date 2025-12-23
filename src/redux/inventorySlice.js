import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ro-service-engineer-be.onrender.com/api/manufacturer/inventory";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// --- ASYNC THUNKS ---

// 1. Fetch All Inventory Products
export const fetchInventory = createAsyncThunk(
  "inventory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, getConfig());
      // API returns { success: true, products: [...] }
      return response.data.products || []; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch inventory");
    }
  }
);

// 2. Fetch Low Stock Products (For the Alert Modal)
export const fetchLowStock = createAsyncThunk(
  "inventory/fetchLowStock",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/low-stock`, getConfig());
      return response.data.products || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// 3. Add Stock (POST)
export const updateStock = createAsyncThunk(
  "inventory/addStock",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/add-stock/${id}`, 
        { stock: quantity.toString() }, 
        getConfig()
      );
      // Return updated stock to update UI immediately
      return { id, newStock: response.data.stock }; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update Failed");
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [],
    lowStockList: [],
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetInventoryState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchInventory.pending, (state) => { state.isLoading = true; })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload; 
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Low Stock
      .addCase(fetchLowStock.fulfilled, (state, action) => {
        state.lowStockList = action.payload;
      })

      // Update Stock
      .addCase(updateStock.pending, (state) => { state.isLoading = true; })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = "Stock Added Successfully!";
        
        // Update Main List
        const index = state.products.findIndex(p => p._id === action.payload.id);
        if (index !== -1) {
            state.products[index].stock = action.payload.newStock;
            // Update status locally
            if(state.products[index].stock > 10) state.products[index].stockStatus = "In Stock";
        }

        // Update Low Stock List (Remove if fixed)
        state.lowStockList = state.lowStockList.filter(p => p._id !== action.payload.id || action.payload.newStock <= 10);
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetInventoryState } = inventorySlice.actions;
export default inventorySlice.reducer;