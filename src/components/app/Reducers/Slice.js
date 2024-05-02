import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: ''
};

const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    resetState(state) {
      state.id = '';
      state.name = '';
      state.email = '';
    }
  }
});

export const { setId, setName, setEmail, resetState } = updateSlice.actions;

export default updateSlice.reducer;