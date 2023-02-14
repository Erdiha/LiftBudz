import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import firebase, { db } from '../firebase/firebase';
import { User, UsersState } from './types';

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    loadUsersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const fetchUsers =
  (): ThunkAction<void, RootState, null, any> => async (dispatch) => {
    dispatch(startLoading());

    try {
      const snapshot = await db.collection('users').get();
      const users: any = snapshot.docs.map(
        (doc: firebase.firestore.QueryDocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        }),
      );
      dispatch(loadUsersSuccess(users));
    } catch (error: any) {
      dispatch(loadUsersFailure(error.message));
    }
  };

export default users.reducer;

export const { startLoading, loadUsersSuccess, loadUsersFailure } =
  users.actions;
