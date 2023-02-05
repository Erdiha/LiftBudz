import firestore, { getDB, db, auth } from '@/firebase/fireBase';
import useAuth from '@/firebase/usefirebaseUI';
import Avatar from 'avataaars';
import { collection } from 'firebase/firestore';
import { useRef } from 'react';
import { Button } from '@material-tailwind/react';
import { useCollection } from 'react-firebase-hooks/firestore';

function SideChats({
	setActiveTab,
	activeTab,
	sendMessageToUser,
	setSendMessageToUser,
	messageUserId,
	setMessageUserId,
}: any) {
	const { currentUser } = useAuth();
	const [usersMessages, Loading, error] = useCollection(
		collection(getDB, 'messages'),
	);
	const unreadMessagesRef: any = useRef(0);
	const allMessages = usersMessages?.docs
		.filter((doc) => {
			const data = doc.data();
			return (
				data.sender === currentUser?.email ||
				data.receiver === currentUser?.email
			);
		})
		.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));

	const [usersData] = useCollection(collection(getDB, 'users'));
	const users = usersData?.docs.map((user: any) => {
		return { id: user.id, ...user.data() };
	});

	console.log('receiver and sender', messageUserId, currentUser?.email, users);

	return (
		<div className="flex flex-col md:h-full bg-orange-300 bottom-0 w-full  p-8 gap-2 top-16 md:top-0 md:relative absolute">
			<Button
				className="w-16 flex justify-center"
				onClick={() => setActiveTab('posts')}
			>
				BACK
			</Button>
			<div className="flex-flex-col bg-white w-full h-full rounded-lg p-1 scroll-y-auto">
				<div className="grid grid-flow-row gap-2 justify-center p-1 rounded">
					{users?.map((user: any) => {
						unreadMessagesRef.current = allMessages?.filter(
							(m: any) => m?.receiver === user?.email && !m.isRead,
						).length;
						return (
							user.email !== currentUser?.email &&
							(allMessages?.some((m: any) => user.email === m.sender) ||
								unreadMessagesRef.current > 0) && (
								<div
									key={user?.uid}
									className="flex items-center p-1 bg-blue-gray-50 relative"
								>
									{unreadMessagesRef.current > 0 && (
										<span className="w-6 aspect-square text-center rounded-full bg-black text-white absolute -top-1 -right-1">
											{unreadMessagesRef.current}
										</span>
									)}
									<Avatar
										style={{ width: '80px', height: '80px' }}
										{...user.photoURL}
										avatarStyle="Circle"
									/>
									<div className="pl-2">
										<div className="font-semibold">
											<button
												onClick={() => {
													setSendMessageToUser(true);
													unreadMessagesRef.current = 0;
													setMessageUserId(user?.email);
												}}
												className="hover:underline"
											>
												{user?.displayName}
											</button>
										</div>
										<div className="text-xs text-gray-600">Online</div>
									</div>
								</div>
							)
						);
					})}
				</div>
			</div>
			<Button
				onClick={() => {
					setSendMessageToUser(true), setMessageUserId('');
				}}
			>
				New Chat
			</Button>
		</div>
	);
}

export default SideChats;
