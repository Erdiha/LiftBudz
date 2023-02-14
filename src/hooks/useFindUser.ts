import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
const useFindUser = (userId: string | undefined) => {
  const [user, setUser]: any = useState(null);

  useEffect(() => {
    let unsubscribe: any = null;
    if (userId) {
      unsubscribe = db
        .collection('users')
        .where('userId', '==', userId)
        .onSnapshot((snapshot) => {
          const users = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          if (users.length > 0) {
            setUser(users[0]);
          }
        });
    }
    return () => unsubscribe && unsubscribe();
  }, [userId]);

  return user;
};

export default useFindUser;
