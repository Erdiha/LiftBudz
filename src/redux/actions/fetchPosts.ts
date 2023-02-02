import { auth, db } from '@/firebase/fireBase';
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from '../reducers/postsReducer';

//import { FETCH_USERS, ADD_USER } from '@/redux/types/userTypes';
import { collection, getDocs } from 'firebase/firestore';

export const fetchPosts = () => async (dispatch: any) => {
  try {
    dispatch(fetchPostsStart());
    // fetch the users from the backend
    let postArray: any[] = [];
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot((snapshot) =>
        postArray.push(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        ),
      );
    console.log(postArray);
    dispatch(fetchPostsSuccess(postArray));
    postArray = [];
  } catch (error: any) {
    dispatch(fetchPostsFailure(error.message));
  }
};
