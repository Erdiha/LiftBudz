import { getDB } from '@/firebase/fireBase';
import { Select, Option, Input } from '@material-tailwind/react';
import { collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function SelectRecipient({
	users,
	sendMessageToUser,
	setMessageUserId,
	setSendMessageToUser,
}: any) {
	const [filteredUsers, setFilteredUsers]: any = useState(users)!;
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setFilteredUsers(
			users?.filter((user: any) =>
				user?.displayName.toLowerCase().includes(searchTerm?.toLowerCase()),
			),
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
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="h-full w-full bg-red-300 flex flex-col">
				{filteredUsers?.map((user: any) => {
					return (
						searchTerm && (
							<button
								onClick={() => {
									setSendMessageToUser(true), setMessageUserId(user.email);
								}}
								key={user.id}
							>
								{user.displayName}
							</button>
						)
					);
				})}
			</div>
		</div>
	);
}
