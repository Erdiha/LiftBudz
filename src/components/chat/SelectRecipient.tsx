import { Input } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useGetUsers } from '../data';
import useAuth from '@/firebase/usefirebaseUI';

export default function SelectRecipient({
	sendMessageToUser,
	setMessageUserId,
	setSendMessageToUser,
}: any) {
	const { currentUser } = useAuth();
	const [searchTerm, setSearchTerm] = useState('');
	const { users, loading, error } = useGetUsers(currentUser?.email, 'friends');
	const [filteredUsers, setFilteredUsers]: any = useState(users)!;
	useEffect(() => {
		setFilteredUsers(
			users?.filter((user: any) =>
				user?.displayName.toLowerCase().includes(searchTerm?.toLowerCase())
			)
		);
	}, [searchTerm, users]);

	return (
		<div className="flex flex-col  h-full justify-center items-center">
			<div className="mb-3 xl:w-96 w-[50%] ">
				<Input
					type="search"
					className="form-control block w-full px-3 py-1.5
			            text-base
			            font-normal
			            text-gray-700
			            bg-white bg-clip-padding 
			            border border-solid border-gray-300 
			            rounded 
			            transition 
			            ease-in-out m-0
			            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
					id="exampleSearch"
					label="Type a Name"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="h-full w-full flex flex-col gap-1 items-center">
				{filteredUsers?.map((user: any) => {
					return (
						<button
							className="bg-gray-200 shadow-md  w-[45%] p-1 md:hover:scale-x-105  rounded md:hover:bg-blue-gray-50"
							onClick={() => {
								setSendMessageToUser(true), setMessageUserId(user.email);
							}}
							key={user.id}
						>
							{user.displayName}
						</button>
					);
				})}
			</div>
		</div>
	);
}
