import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase, { db } from '@/firebase/fireBase';
import useAuth from '@/firebase/usefirebaseUI';
import Loading from '@/utils/Loading';
import SelectRecipient from './SelectRecipient';
import {
	collection,
	query,
	where,
	onSnapshot,
	addDoc,
	serverTimestamp,
	orderBy,
} from 'firebase/firestore';
import { Input } from '@material-tailwind/react';
import ChatContent from './ChatContent';

export interface IMessage {
	sender: String;
	receiver: String;
	timestamp: any;
	receiverHasRead: Boolean;
	text: String;
	image?: String;
}

const ChatUI = ({
	setActiveTab,
	activeTab,
	sendMessageToUser,
	setSendMessageToUser,
	messageUserId,
	setMessageUserId,
	users,
}: any) => {
	//const [newMessage, setNewMessage] = useState<IMessage>();
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [inputValue, setInputValue]: any = useState();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { currentUser } = useAuth();
	const curUserID = currentUser?.uid;
	const curUserEMAIL = currentUser?.email;
	const messageRef: any = collection(db, 'messages');

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
	const messagesRef: any = db
		.collection('messages')
		.orderBy('timestamp', 'asc');

	const [Messages, loading, error] = useCollection(messagesRef);

	const rawMessages = Messages?.docs.map((doc: any) => ({
		...doc.data(),
		id: doc.id,
	}));

	const allMessages = rawMessages?.filter(
		(msg: any) =>
			(msg.sender === curUserEMAIL && msg.receiver === messageUserId) ||
			(msg.receiver === curUserEMAIL && msg.sender === messageUserId),
	);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [inputValue, []]);

	console.log('MESSAGES', allMessages);
	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
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
