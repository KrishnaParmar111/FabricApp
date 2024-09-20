import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  GET_BOTTOM_REPOSITORY,
  GET_MIDDLE_REPOSITORY,
  GET_TOP_REPOSITORY,
} from '../../utils/urls';

const initialState = {
  topData: [],
  middleData: [],
  bottomData: [],
  isTopLoading: false,
  isMiddleLoading: false,
  isBottomLoading: false,
  error: null,
};

const GETHOMETOPDATA = 'GetHomeTopData';
const GETHOMEMIDDLEDATA = 'getMiddleHomeData';
const GETHOMEBOTTOMDATA = 'getBottomHomeData';

export const getTopHomeData = createAsyncThunk(
  GETHOMETOPDATA + '/getHomeTopData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(GET_TOP_REPOSITORY);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const getMiddleHomeData = createAsyncThunk(
  GETHOMEMIDDLEDATA + '/getMiddleHomeData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(GET_MIDDLE_REPOSITORY);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const getBottomHomeData = createAsyncThunk(
  GETHOMEBOTTOMDATA + '/getBottomHomeData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(GET_BOTTOM_REPOSITORY);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTopHomeData.pending, state => {
      state.isTopLoading = true;
      state.error = null;
    });
    builder.addCase(getTopHomeData.fulfilled, (state, action) => {
      state.isTopLoading = false;
      state.topData = action.payload;
      state.error = null;
    });
    builder.addCase(getTopHomeData.rejected, (state, action) => {
      state.isTopLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getMiddleHomeData.pending, state => {
      state.isMiddleLoading = true;
      state.error = null;
    });
    builder.addCase(getMiddleHomeData.fulfilled, (state, action) => {
      state.isMiddleLoading = false;
      state.middleData = action.payload;
      state.error = null;
    });
    builder.addCase(getMiddleHomeData.rejected, (state, action) => {
      state.isMiddleLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getBottomHomeData.pending, state => {
      state.isBottomLoading = true;
      state.error = null;
    });
    builder.addCase(getBottomHomeData.fulfilled, (state, action) => {
      state.isBottomLoading = false;
      state.bottomData = action.payload;
      state.error = null;
    });
    builder.addCase(getBottomHomeData.rejected, (state, action) => {
      state.isBottomLoading = false;
      state.error = action.payload;
    });
  },
});

export default homeSlice.reducer;
