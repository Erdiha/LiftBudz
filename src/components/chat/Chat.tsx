import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import useAuth from '@/firebase/usefirebaseUI';
import Loading from '@/utils/Loading';
import SelectRecipient from './SelectRecipient';
import { Input } from '@material-tailwind/react';
import ChatContent from './ChatContent';
import { useGetAvatar } from '@/hooks/useFetch';
import { useGetMessages, useGetUsers } from '../data';
import { db } from '@/firebase/fireBase';

export interface IMessage {
	sender: string;
	receiver: string;
	timestamp: any;
	receiverHasRead: boolean;
	text: string;
	image?: string;
}

const ChatUI = ({
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
	const curUserID = currentUser?.uid;
	const curUserEMAIL = currentUser?.email;
	const messageRef = collection(db, 'messages');

	const { users, loading, error } = useGetUsers(curUserEMAIL, '');

	const {
		allMessages,
		loading: messagesLoading,
		error: messagesError,
	} = useGetMessages(messageUserId, curUserEMAIL, false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!messageUserId) {
			return;
		}
		if (!inputValue) {
			return;
		}

		const message = {
			text: inputValue,
			sender: curUserEMAIL!,
			receiver: messageUserId,
			receiverHasRead: false,
			createdAt: serverTimestamp(),
			timestamp: Date.now(),
			image: '',
		};
		await addDoc(messageRef, message);
		setInputValue('');
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [inputValue, []]);

	if (error) {
		return <div>Error: {error?.message}</div>;
	}

	return (
		<div className="flex flex-col h-full w-full bg-blue-gray-50 relative pt-10">
			{messageUserId ? (
				<ChatContent
					{...{
						allMessages,
						users,
						curUserEMAIL,
						messagesEndRef,
						handleSubmit,
						inputValue,
						setInputValue,
						loading,
					}}
				/>
			) : (
				<SelectRecipient
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					sendMessageToUser={sendMessageToUser}
					setSendMessageToUser={setSendMessageToUser}
					messageUserId={messageUserId}
					setMessageUserId={setMessageUserId}
					users={users}
				/>
			)}
		</div>
	);
};

export default ChatUI;
