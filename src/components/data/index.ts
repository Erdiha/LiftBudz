import { db } from '@/firebase/fireBase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { sorting } from '../../utils/helperFuntions';

export const useGetMessages = (
	messageUserId: any,
	curUserEMAIL: any,
	all: boolean
): any => {
	const messagesRef: any = db
		.collection('messages')
		.orderBy('timestamp', 'asc');

	const [Messages, loading, error] = useCollection(messagesRef);

	const data: any = Messages?.docs.map((doc: any) => ({
		...doc.data(),
		id: doc.id,
	}));
	const allMessages: any = all
		? data
		: data?.filter(
				(msg: any) =>
					(msg.sender === curUserEMAIL && msg.receiver === messageUserId) ||
					(msg.receiver === curUserEMAIL && msg.sender === messageUserId)
		  );

	return { allMessages, loading, error };
};

export const useGetUsers = (curUserEMAIL: any, filter: string | null): any => {
	const userRef: any = db.collection('users');

	const [usersData, loading, error] = useCollection(userRef);

	const data = usersData?.docs.map((user: any) => {
		return { id: user.id, ...user.data() };
	});
	let users: any = [];
	switch (filter) {
		case 'friends':
			users = sorting(data?.filter((user: any) => user.email !== curUserEMAIL));
			break;
		case 'unreadMessages':
			users = data?.filter((user: any) => user.email !== curUserEMAIL);
			break;
		default:
			users = data;
			break;
	}
	return { users, loading, error };
};
