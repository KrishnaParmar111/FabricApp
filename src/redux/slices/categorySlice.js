import axios from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GET_CATEGORY_REPOSITORY} from '../../utils/urls';

const initialState = {
  categoryData: [],
  isLoading: false,
  error: null,
};

const GETCATEGORYDATA = 'GetCategoryData';

export const getCategoryData = createAsyncThunk(
  GETCATEGORYDATA + '/getCategoryData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(GET_CATEGORY_REPOSITORY);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategoryData.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCategoryData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoryData = action.payload;
      state.error = null;
    });
    builder.addCase(getCategoryData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export the reducer function
export default categorySlice.reducer;
