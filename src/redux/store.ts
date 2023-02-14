import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';
import chatANDPostSlice from './chatsSlice';
import chatsSlice from './chatsSlice';
import postsSlice from './postsSlice';

const rootReducer = combineReducers({
  chats: chatsSlice,
  users: usersSlice,
  posts: postsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
