import { auth, db } from '@/firebase/fireBase';
import {
	fetchUsersStart,
	fetchUsersSuccess,
	fetchUsersFailure,
} from '../reducers/usersReducer';

//import { FETCH_USERS, ADD_USER } from '@/redux/types/userTypes';
import { collection, getDocs } from 'firebase/firestore';

export const fetchUsers = (action: string) => async (dispatch: any) => {
	try {
		dispatch(fetchUsersStart());
		// fetch the users from the backend
		const colRef = collection(db, 'users');
		const docsSnap = await getDocs(colRef);
		let users: any = [];

		if (docsSnap.docs.length > 0) {
			docsSnap.forEach((doc: any) => {
				action === 'current'
					? auth.currentUser?.uid === doc.data().userId &&
					  users.push({ ...doc.data(), id: doc.id })
					: users.push({ ...doc.data(), id: doc.id });
			});
			dispatch({
				type: {},
				payload: users,
			});
		}
		dispatch(fetchUsersSuccess(users));
		users = [];
	} catch (error: any) {
		dispatch(fetchUsersFailure(error.message));
	}
};
