import { useEffect, useState } from 'react';
import { firebase, auth, db } from '@/firebase/fireBase';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { updateCurrentUser } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/actions/getAllRegisteredUsers';
import UserCard from './UserCard';

function UserLists() {
  const dispatch: any = useDispatch();
  const users = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(fetchUsers('all'));
  }, [dispatch]);

  return (
    <div>
      <div
        className={`w-full justify-center items-center bg-gray-100 text-black grid grid-rows-${users?.length} p-10 gap-10`}
      >
        {users?.map((user: any, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-2 ">
              <UserCard {...user} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default connect()(UserLists);
