import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("questionData", async () => {
  try {
    const res = await axios.get("http://localhost:6001/api/qpool");
    console.log(res);

    return res.data.data;
  } catch (error) {
    throw new Error("failed");
  }
});

export const fetchDataById = createAsyncThunk("quesById", async (id) => {
  try {
    const res = await axios.get(`http://localhost:6001/api/qpool/${id}`);
    console.log(res);

    return res.data.data;
  } catch (error) {
    throw new Error("failed");
  }
});

const initialState = {
  data: [],
  dataById:[],
  error: "",
  loading: true,
};
const questionsSlice = createSlice({
  name: "quastions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = true;
      state.data = action.payload;
    });
    builder.addCase(fetchDataById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDataById.fulfilled, (state, action) => {
      state.loading = false;
      state.dataById = action.payload;
    });
    builder.addCase(fetchDataById.rejected, (state, action) => {
      state.loading = true;
      state.data = action.payload;
    });
  },
});

export const {} = questionsSlice.actions;

export default questionsSlice.reducer;
