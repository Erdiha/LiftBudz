import firebase from '../../firebase/firebase';
import {
	fetchDataStart,
	fetchDataSuccess,
	updateDataSuccess,
} from '../reducers/addORfetchReducer';

export const fetchData = () => async (dispatch: any, userData: any) => {
	dispatch(fetchDataStart());
	const db = firebase.firestore();
	const data: any = [];
	const snapshot = await db.collection(userData).get();
	snapshot.forEach(doc => {
		data.push({
			id: doc.id,
			...doc.data(),
		});
	});
	dispatch(fetchDataSuccess(data));
};

export const updateData = (data: Data) => async (dispatch: any) => {
	const db = firebase.firestore();
	await db.collection('data').doc(data.id).update(data);
	dispatch(updateDataSuccess(data));
};
