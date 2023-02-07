import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import useAuth from '@/firebase/usefirebaseUI';
import Loading from '@/utils/Loading';
import SelectRecipient from './SelectRecipient';
import ChatContent from './ChatContent';
import { useGetAvatar } from '@/hooks/useFetch';
import { useGetMessages, useGetUsers } from '../data';
import { Input } from '@material-tailwind/react';
import { db } from '@/firebase/fireBase';

interface IMessage {
	conversationId: string[];
	timestamp: any;
	receiverHasRead: boolean;
	text: string;
	image?: string;
}

const Chat = ({
	setActiveTab,
	activeTab,
	sendMessageToUser,
	setSendMessageToUser,
	messageUserId,
	setMessageUserId,
}: any) => {
	const [inputValue, setInputValue] = useState<string>('');
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { currentUser } = useAuth();
	const curUserEMAIL: any = currentUser?.email;

	const {
		users,
		loading: usersLoading,
		error: usersError,
	}: any = useGetUsers(curUserEMAIL, '');
	const {
		allMessages,
		loading: messagesLoading,
		error: messagesError,
	}: any = useGetMessages(messageUserId, curUserEMAIL, false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!messageUserId || !inputValue) {
			return;
		}

		const message = {
			text: inputValue,
			conversationId: [currentUser?.email, messageUserId],
			receiverHasRead: false,
			createdAt: serverTimestamp(),
			timestamp: Date.now(),
			image: '',
		};
		await addDoc(collection(db, 'messages'), message);
		setInputValue('');
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [inputValue, []]);

	if (usersError || messagesError) {
		return <div>Error: {usersError?.message || messagesError?.message}</div>;
	}

	return (
		<div className="flex flex-col h-full w-full bg-blue-gray-50 relative pt-10">
			{messageUserId ? (
				<ChatContent
					allMessages={allMessages}
					users={users}
					curUserEMAIL={curUserEMAIL}
					messagesEndRef={messagesEndRef}
					handleSubmit={handleSubmit}
					inputValue={inputValue}
					setInputValue={setInputValue}
					messageUserId={messageUserId}
				/>
			) : (
				<SelectRecipient
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					setMessageUserId={setMessageUserId}
					loading={usersLoading}
					error={usersError}
					users={users}
					curUserEMAIL={curUserEMAIL}
					setSendMessageToUser={setSendMessageToUser}
				/>
			)}
		</div>
	);
};

export default Chat;