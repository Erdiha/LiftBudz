import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '@/firebase/firebase';
import { mockposts } from '@/components/data/data';
import { IPost } from '@/components/posts/types';

// Async Thunk to fetch posts from the database
export const fetchPosts = createAsyncThunk<IPost[]>(
  'posts/fetchPosts',
  async () => {
    const response: any = await db.collection('posts').get();
    const postsData: any = response.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return postsData;
  },
);

// Posts slice
interface PostsState {
  posts: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: mockposts,
  status: 'idle',
  error: null,
};

const postsSlice: any = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(
        (post: any) => post.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, removePost } = postsSlice.actions;

export default postsSlice.reducer;
