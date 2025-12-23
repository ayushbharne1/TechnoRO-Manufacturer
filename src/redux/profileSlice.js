// profile slice issue 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ro-service-engineer-be.onrender.com/api/manufacturer";

// =======================
// GET PROFILE (UPDATED)
// =======================
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (phone, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem("token"); //  GET TOKEN


      const res = await axios.get(
        `${BASE_URL}/getById`,
        { params: { phone },
      headers:{
        Authorization: `Bearer ${token}`,

      } 
    }
      );
      // API returns { data: { ...profile } }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);


// =======================
// UPDATE PROFILE
// =======================
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(`${BASE_URL}/update-profile`, formData, {
        headers: { Authorization: `Bearer ${token}` 
      },
      });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// =======================
// CHANGE PASSWORD
// =======================
export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async ({ oldPassword, password }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${BASE_URL}/change-password`,
        { oldPassword, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to change password"
      );
    }
  }
);

// =======================
// SLICE
// =======================
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET PROFILE
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;



