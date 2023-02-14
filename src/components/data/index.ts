import { useCollection } from 'react-firebase-hooks/firestore';
import { sorting } from '../../utils/helperFuntions';
import { db } from '../../firebase/firebase';

export const useGetMessages = (
  messageUserId: string | undefined,
  curUserEMAIL: string | undefined,
  all: boolean = false,
): { allMessages: object[]; loading: boolean; error: any } => {
  const messagesRef = db.collection('messages').orderBy('timestamp', 'asc');

  let query: any = messagesRef;

  const [Messages, loading, error] = useCollection(query);

  const allMessages: any = Messages?.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return { allMessages, loading, error };
};

export function useGetUsers(curUserEMAIL: any, filter: string | null): any {
  const userRef: any = db.collection('users');

  const [usersData, loading, error] = useCollection(userRef);

  const data = usersData?.docs.map((user: any) => {
    return { id: user.id, ...user.data() };
  });
  let users: any = [];
  switch (filter) {
    case 'friends':
      console.log('sending friends');
      users = sorting(
        data?.filter((user: any) => user.email !== curUserEMAIL),
        'name',
        'asc',
      );
      break;
    case 'unreadMessages':
      users = data?.filter((user: any) => user.email !== curUserEMAIL);
      break;
    case 'user':
      users = data?.filter((user: any) => user.email === curUserEMAIL);
    default:
      users = data;
      break;
  }
  return { users, loading, error };
}
