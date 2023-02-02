import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Posts {
  post: any;
}

interface UsersState {
  posts: any;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  posts: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'getPosts',
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
    },
    fetchPostsSuccess: (state, action: PayloadAction<Posts[]>) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } =
  usersSlice.actions;

export default usersSlice.reducer;
