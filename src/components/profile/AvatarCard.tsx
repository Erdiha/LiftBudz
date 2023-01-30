import Avatar, { AvatarStyle } from 'avataaars';
import { useRef, useState } from 'react';
import { db } from '@/firebase/fireBase';
import useAuth from '../../firebase/usefirebaseUI';
import { useEffect } from 'react';

let avatarBucket: any = [];

function AvatarCard({ setOpen }: any) {
  const { currentUser } = useAuth();
  const userID = currentUser!.uid;
  let [allAvatars, setAllAvatars]: any = useState([]);
  //const avatarRef: any = useRef(null);

  const handleGetAvatarCollection = async () => {
    const avatarsRef = db
      .collection('avatars')
      .get()
      .then((snapshot) => {
        let avatars: any = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          avatars.push(data);
        });
        setAllAvatars(avatars);
        console.log(snapshot);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetAvatarCollection();
  }, []);

  const handleChosenAvatar = async (event: any, avatar: any) => {
    event.preventDefault();
    try {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.get();
      await Promise.all(
        snapshot.docs.map((doc: any) => {
          if (doc.data().userId === userID) {
            return doc.ref.update({
              ...doc.data(),
              photoURL: avatar,
            });
          }
        }),
      );
    } catch (error) {
      console.error('Error saving data: ', error);
    } finally {
      setOpen(false);
    }
  };

  console.log(allAvatars);
  return (
    <div className="grid grid-cols-3 gap-2 ">
      {allAvatars?.map((avatar: any) => {
        return (
          <button
            key={avatar.id}
            className="flex justify-center items-center"
            onClick={(event: any) => handleChosenAvatar(event, avatar)}
          >
            <Avatar
              key={avatar.id}
              style={{ width: '80px', height: '80px' }}
              {...avatar}
            />
          </button>
        );
      })}
    </div>
  );
}

export default AvatarCard;
