import homeReducer from './slices/homeSlice';
import {configureStore} from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    category: categoryReducer,
  },
});
