import { useEffect, useState } from 'react';
import { firebase, auth, db } from '@/firebase/fireBase';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { updateCurrentUser } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

function UserLists() {
  const { currentUser } = useAuth();
  const { getAllUsers } = useUserLibrary(currentUser?.uid);
  const [users, setUsers] = useState(getAllUsers);
  const userz: any = [];
  const getUsers = async () => {
    const colRef = collection(db, 'users');
    try {
      const docsSnap = await getDocs(colRef);
      if (docsSnap.docs.length > 0) {
        setUsers(docsSnap.docs);
        // docsSnap.forEach((doc) => {
        //   userz.push({ ...doc.data(), id: doc.id });
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [db, auth, currentUser]);
  return (
    <div
      className={`w-full   bg-gray-100 text-black grid grid-rows-${users?.length} p-10 gap-10`}
    >
      {users?.map((user: any, index: number) => {
        return (
          <div key={index} className="flex flex-col gap-2 ">
            <p>Name: {user?.data()?.displayName}</p>
            <p>Email: {user?.data()?.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default UserLists;
