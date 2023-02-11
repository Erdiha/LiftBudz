import React, { useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, getDB } from '../../firebase/firebase';
import Loading from '@/utils/Loading';
import { useadddb, useFetchDB } from '../../hooks/useFetch';
import { collection } from 'firebase/firestore';
import useAuth from '../../firebase/usefirebaseUI';
import Chat from '../chat/Chat';

const MessageList = ({
	openChat,
	setOpenChat,
	sendMessageToUser,
	setSendMessageToUser,
	messageUserId,
	setMessageUserId,
}: any) => {
	const { currentUser } = useAuth();
	const dummy = useRef<HTMLDivElement>(null);
	const [formValue, setFormValue]: any = useState('');
	const messagesRef: any = db.collection('messages');
	let query: any = messagesRef.orderBy('createdAt').limit(25);
	const [querySnapshot, loading, error] = useCollection(query);
	const messages = useFetchDB('messages', 'asc');
	const [userMessage, setUserMessage]: any = useState<{
		sender: [];
		receiver: [];
	}>({
		sender: [],
		receiver: [],
	});
	const sendMessage = async (e: any) => {
		e.preventDefault();
		useadddb(formValue, messagesRef);
		setFormValue('');
		dummy?.current?.scrollIntoView({ behavior: 'smooth' });
	};
	const [usersData] = useCollection(collection(getDB, 'users'));

	const users = usersData?.docs.map((user: any) => ({
		id: user.id,
		...user.data(),
	}));

	if (loading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}
	// useEffect(() => {
	//   setUserMessage({
	//     sender: messages.filter(
	//       (message: any) => message.sender === currentUser?.uid,
	//     ),
	//     receiver: messages.filter((message: any) =>
	//       users?.filter((user: any) => messageUserId === message.receiver),
	//     ),
	//   });
	// }, [messages, messageUserId]);
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	console.log('this is message user id', messageUserId);
	return (
		<div className="h-[90vh] relative flex flex-col justify-center items-center">
			{/* <MessageCard
        setOpenChat={setOpenChat}
        openChat={openChat}
        messages={messages}
        setFormValue={setFormValue}
        sendMessage={sendMessage}
        sendMessageToUser={sendMessageToUser}
        setSendMessageToUser={setSendMessageToUser}
        messageUserId={messageUserId}
        setMessageUserId={setMessageUserId}
      />*/}
			<Chat />
		</div>
	);
};

export default MessageList;
