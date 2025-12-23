import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ro-service-engineer-be.onrender.com/api/manufacturer/orders";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// --- HELPER TO EXTRACT DATA CONSISTENTLY ---
// This fixes the crash by handling both 'data' and 'order' keys
const extractResponse = (response) => {
  if (response.data && response.data.data) return response.data.data;
  if (response.data && response.data.order) return response.data.order;
  return response.data;
};


export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL, getConfig());
      return extractResponse(response) || []; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, getConfig());
      return extractResponse(response);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch details");
    }
  }
);

export const confirmOrder = createAsyncThunk("orders/confirm", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/order-confirm`, {}, getConfig());
    return extractResponse(response);
  } catch (error) { return rejectWithValue(error.response?.data?.message); }
});

export const rejectOrder = createAsyncThunk("orders/reject", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/order-reject`, {}, getConfig());
    return extractResponse(response);
  } catch (error) { return rejectWithValue(error.response?.data?.message); }
});

export const assignPartner = createAsyncThunk("orders/assignPartner", async ({ id, partnerName }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/assign-delivery-partner`, { deliveryPartner: partnerName }, getConfig());
    return extractResponse(response);
  } catch (error) { return rejectWithValue(error.response?.data?.message); }
});

export const updateOrderStatus = createAsyncThunk("orders/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    let endpoint = "";
    if (status === "picked") endpoint = "picked-up";
    if (status === "shipped") endpoint = "shipped";
    if (status === "out") endpoint = "out-for-delivery";
    if (status === "delivered") endpoint = "delivered";

    const response = await axios.put(`${BASE_URL}/${id}/${endpoint}`, {}, getConfig());
    return extractResponse(response);
  } catch (error) { return rejectWithValue(error.response?.data?.message); }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    ordersList: [],
    currentOrder: null,
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.isLoading = false; state.ordersList = action.payload; })
      
      .addCase(fetchOrderById.pending, (state) => { state.isLoading = true; }) 
      .addCase(fetchOrderById.fulfilled, (state, action) => { state.isLoading = false; state.currentOrder = action.payload; })
      
      .addMatcher(
        (action) => [confirmOrder.fulfilled.type, rejectOrder.fulfilled.type, assignPartner.fulfilled.type, updateOrderStatus.fulfilled.type].includes(action.type),
        (state, action) => { 
            state.isLoading = false; 
            state.currentOrder = action.payload; 
            state.successMessage = "Order Updated Successfully!"; 
        }
      )
      .addMatcher(
        (action) => [confirmOrder.rejected.type, rejectOrder.rejected.type, assignPartner.rejected.type, updateOrderStatus.rejected.type].includes(action.type),
        (state, action) => { state.isLoading = false; state.error = action.payload; }
      )
      .addMatcher(
        (action) => [confirmOrder.pending.type, rejectOrder.pending.type, assignPartner.pending.type, updateOrderStatus.pending.type].includes(action.type),
        (state) => { state.isLoading = true; state.error = null; state.successMessage = null; }
      );
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;