import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../reducers/UpdateCurrentUser';

//import { FETCH_USERS, ADD_USER } from '@/redux/types/userTypes';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, firebase } from '../../firebase/fireBase';
import { updateCurrentUser } from 'firebase/auth';

export const updateUser = (data: any) => async (dispatch: any) => {
  try {
    dispatch(updateUserStart());
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    let users: any = [];
    await Promise.all(
      snapshot.docs.map((doc) => {
        doc.data().userId === auth.currentUser?.uid &&
          doc.ref.update({ ...data });
      }),
    );
    dispatch(updateUserSuccess(users));
  } catch (error: any) {
    dispatch(updateUserFailure(error.message));
  }
};
