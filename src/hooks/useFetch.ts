import firebase, { auth, db } from '@/firebase/fireBase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export function useFetchDB(collectionString: string, order: any) {
  const [postArray, setPostArray]: any = useState([]);
  const collectionREF = db.collection(collectionString);
  const timedAT = collectionREF.orderBy('createdAt', order).limit(50);
  // const NotTimedAT = collectionREF

  useEffect(() => {
    order
      ? timedAT.onSnapshot((snapshot) =>
          setPostArray(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          ),
        )
      : collectionREF.onSnapshot((snapshot) =>
          setPostArray(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          ),
        );
  }, []);
  console.log(postArray);
  return postArray;
}

//updates current db
export function useAddDB(value: any, event: any, refDB: any) {
  event.preventDefault();
  const { uid, photoURL }: any = auth.currentUser;
  value !== '' &&
    refDB.add({
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
}

export const useGetAvatar = () => {
  const [avatarOptions, setAvatarOptions] = useState({});

  useEffect(() => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (QuerySnapshot) => {
      QuerySnapshot.forEach((doc) => {
        if (doc.data().userId === auth.currentUser?.uid) {
          setAvatarOptions(doc.data().photoURL);
        }
      });
    });
  }, []);
  return avatarOptions;
};
