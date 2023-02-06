import firestore, { getDB, db, auth } from '@/firebase/fireBase';
import useAuth from '@/firebase/usefirebaseUI';
import Avatar from 'avataaars';
import { collection } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { Button } from '@material-tailwind/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useGetMessages } from '@/components/data';
import { useGetUsers } from '../../data';
import Loading from '@/utils/Loading';

function SideChats({
	setActiveTab,
	activeTab,
	sendMessageToUser,
	setSendMessageToUser,
	messageUserId,
	setMessageUserId,
}: any) {
	const { currentUser } = useAuth();
	const curUserEMAIL = currentUser?.email;
	const unreadRef = useRef<number>(0);
	let unreadMessages: any = [];
	const { allMessages, l, e } = useGetMessages(
		messageUserId,
		curUserEMAIL,
		true
	);
	const { users, loading, error } = useGetUsers(curUserEMAIL, 'friends');

	const handleUserMessageClicked = async (user: any) => {
		allMessages?.filter((m: any) => {
			if (user.email === m.sender) {
				const messageRef = db.collection('messages').doc(m.id);
				messageRef.update({
					receiverHasRead: true,
				});
			}
		});
		setSendMessageToUser(true);
		setMessageUserId(user?.email);
	};

	// Assuming you have a reference to your Firestore database
	console.log('this is unread messages', unreadMessages.length);
	const unread: any = [];
	return (
		<div className="flex flex-col md:h-full bg-gray-200 bottom-0 w-full  p-8 gap-2 top-16 md:top-0 md:relative absolute">
			<Button
				className="w-16 flex justify-center"
				onClick={() => setActiveTab('posts')}
			>
				BACK
			</Button>
			<div className="flex-flex-col bg-white w-full h-full rounded-lg p-4 scroll-y-auto ">
				<div className="grid grid-flow-row gap-3 justify-center  rounded">
					{loading ? (
						<Loading />
					) : (
						users?.map((user: any) => {
							return (
								allMessages?.some((m: any) => user.email === m.sender) && (
									<div
										key={user?.uid}
										className={`flex rounded shadow-md items-center p-3 relative w-full ${messageUserId === user.email ? 'bg-blue-200 scale-105' : 'bg-blue-gray-50 scale-100'}`}
									>
										{allMessages?.some(
											(m: any) =>
												m.receiverHasRead === false && m.sender === user.email
										) && (
											<span className="w-3  animate-bounce aspect-square text-center rounded-full bg-red-500 text-white absolute -top-1 -right-1"></span>
										)}
										<Avatar
											style={{ width: '80px', height: '80px' }}
											{...user.photoURL}
											avatarStyle="Circle"
										/>
										<div className="pl-2">
											<div className="font-semibold">
												<button
													onClick={() => handleUserMessageClicked(user)}
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
						})
					)}
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
