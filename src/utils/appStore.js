import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from './moviesSlice';
import gptSliceReducer from './gptSlice';
import configReducer from './configSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptSliceReducer,
    config: configReducer,
  },
});

export default appStore;
