import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/fireBase';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { updateCurrentUser } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/actions/getAllRegisteredUsers';
import UserCard from './UserCard';
import { useGetUsers } from '../data/index';

function UserLists() {
	const { currentUser } = useAuth();
	const { users, loading, error } = useGetUsers(currentUser?.email, 'friends');

	return (
		<div className="scroll-y-auto overflow-y-auto max-h-[65vh]">
			<div
				className={`w-full justify-center items-center bg-gray-100 text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10 `}
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

export default UserLists;
