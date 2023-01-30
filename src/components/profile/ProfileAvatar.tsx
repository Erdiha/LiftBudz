import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from '@/utils/AvatarConfig';
import { useEffect, useState } from 'react';
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { auth, db, firebase } from '@/firebase/fireBase';
import useAuth from '@/firebase/usefirebaseUI';

function ProfileAvatar({ setOpen }: any) {
  const { currentUser } = useAuth();
  const [avatarOptions, setAvatarOptions] = useState({});
  const userID = currentUser!.uid;

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unSubscribe: any = onSnapshot(q, (QuerySnapshot) => {
      QuerySnapshot.forEach((doc) => {
        if (doc.data().userId === userID) {
          setAvatarOptions(doc.data().photoURL);
        }
      });
    });
    return () => unSubscribe;
  }, []);

  return (
    <button onClick={setOpen((prev: boolean) => !prev)} className="">
      <Avatar
        style={{ width: '100px', height: '100px' }}
        avatarStyle="Circle"
        {...avatarOptions}
      />
    </button>
  );
}

export default ProfileAvatar;
