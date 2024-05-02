import { configureStore } from '@reduxjs/toolkit';
import updateReducer from './Reducers/Slice';

const store = configureStore({
  reducer: {
    update: updateReducer
  }
});

export default store;