import { combineReducers } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';
import chatANDPost from './chatsSlice';
import postsSlice from './postsSlice';

const rootReducer = combineReducers({
  chats: chatANDPost,
  users: usersSlice,
  posts: postsSlice,
});

export default rootReducer;
