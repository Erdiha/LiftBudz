import { createSlice } from '@reduxjs/toolkit';

interface DataState {
  data: Data[];
  loading: boolean;
}

const initialState: DataState = {
  data: [],
  loading: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart: state => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    updateDataSuccess: (state, action) => {
      const data = state.data.map(d => {
        if (d.id === action.payload.id) {
          return action.payload;
        }
        return d;
      });
      state.data = data;
      state.loading = false;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, updateDataSuccess } =
  dataSlice.actions;

export default dataSlice.reducer;
