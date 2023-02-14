import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import firebase, { db } from '../firebase/firebase';
import { IChat } from './types';

interface chatState {
  chats: IChat[]; // add posts array to state
  isLoading: boolean;
  error: string | null;
}

const initialState: chatState = {
  chats: [], // initialize posts array to empty
  isLoading: false,
  error: null,
};

const chats = createSlice({
  name: 'chatAndPost',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadChatsSuccess: (state, action: PayloadAction<IChat[]>) => {
      state.chats = action.payload;
      state.isLoading = false;
    },
    loadChatsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  startLoading,
  loadChatsSuccess,
  loadChatsFailure,
  // export new action creators for posts
} = chats.actions;

// add new async action creator to fetch posts

// export existing async action creator for messages
export const fetchChats =
  (): ThunkAction<void, RootState, null, any> => async (dispatch) => {
    dispatch(startLoading());

    try {
      const snapshot = await db
        .collection('messages')
        .orderBy('timestamp')
        .get();
      const chats: any = snapshot.docs.map(
        (doc: firebase.firestore.QueryDocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        }),
      );
      dispatch(loadChatsSuccess(chats));
    } catch (error: any) {
      dispatch(loadChatsFailure(error.message));
    }
  };

export default chats.reducer;
