import { Input, Tooltip } from '@material-tailwind/react';
import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
type Props = {
	allMessages: any[];
	users: any[];
	curUserEMAIL: string | null | undefined;
	messagesEndRef: any;
	handleSubmit: (event: any) => void;
	inputValue: string;
	setInputValue: (value: string) => void;
	messageUserId: any;
};
import { useDelete } from '@/hooks/useDelete';
import { toast } from 'react-toastify';
import Avatar from 'avataaars';
import { useGetAvatar } from '@/hooks/useFetch';
import { useUserLibrary } from '../../firebase/usefirebaseUI';
import useAuth from '../../firebase/usefirebaseUI';
import { useGetUsers } from '../data';
import { capitalFirstLetter } from '@/utils/textModify';
const ChatContent = ({
	allMessages,
	users,
	curUserEMAIL,
	messagesEndRef,
	handleSubmit,
	inputValue,
	setInputValue,
	messageUserId,
}: Props) => {
	
	const { deleteItem, dLoading, dError } = useDelete();
	
	const getAvatar = useGetAvatar();
	const {getCurrentUser} = useUserLibrary(useAuth().currentUser?.uid);
	const handleDelete = (ID: string) => {
		deleteItem(ID, 'messages');
		if (dLoading) {
			toast('Loading!');
		} else if (dError) {
			toast('Error deleting message!');
		} else {
			toast('Message deleted successfully!');
		}
	};
	console.log("this is all messages in chatcontent" , allMessages)
	return (
		<div className="flex  flex-col h-full w-full max-w-7xl shadow-xl rounded-lg overflow-hidden backdrop-blur-lg	">
			<div className=" w-full p-2  gap-2 items-center border-b-[1px] bg-blue-gray-100  flex ">
				{' '}
				<Avatar className="ring-2 ring-white/50 rounded-full drop-shadow-lg "
					style={{ width: '30px', height: '30px' }}
					avatarStyle="Circle"
					{...getAvatar}
				/>
				<span className="font-semibold drop-shadow-lg ">{getCurrentUser?.displayName.toUpperCase()}</span>
			</div>
			<div className="flex flex-col w-full overflow-auto h-full p-6 px-7 font-sans">
				{allMessages?.map((message: any) => {
					const sender = users.find(
						(user: any) => user.email === message.conversationId[0]
					);
					return (
						message?.conversationId.includes(curUserEMAIL) &&
						message?.conversationId.includes(messageUserId) && (
							<div
								key={message?.id}
								className={`flex flex-col p-0 mb-4 relative group  ${
									message.conversationId[0] === curUserEMAIL
										? 'self-end'
										: 'self-start'
								}`}
							>
								<Tooltip content="Delete Message">
									<span
										onClick={() => handleDelete(message?.id)}
										className={`md:hover:scale-110 cursor-pointer  absolute rounded-full text-red-400 bg-white  aspect-square text-center ${
											message?.conversationId[0] === curUserEMAIL
												? '-top-2 -left-2 hidden group-hover:block'
												: 'hidden'
										}`}
									>
										<TiDeleteOutline />
									</span>
								</Tooltip>
								<div className="relative">
									<span
										className={`flex absolute border-[1px] border-blue-gray-400 bg-blue-gray-50 justify-center rounded-full p-4 w-8 h-8 font-bold  text-gray-800 items-center ${
											message?.conversationId[0] === curUserEMAIL
												? '-right-5 -top-5'
												: '-left-5 -top-5'
										}`}
									>
										{capitalFirstLetter(sender?.displayName)}
									</span>
								</div>
								<div
									className={`message p-4 rounded border-2  border-blue-gray-600 ${
										message?.conversationId[0] === curUserEMAIL
											? 'bg-blue-gray-400 text-white'
											: 'bg-blue-gray-100 text-black'
									}`}
								>
									<p className="text-sm flex justify-center h-full w-full">
										{message?.text}
									</p>
								</div>
								<div
									className={`flex text-xs italic font-extralight ${
										message?.conversationId[0] === curUserEMAIL
											? 'justify-end pr-2'
											: 'justify-start pl-2'
									}`}
								>
									{new Date(message?.timestamp).toLocaleDateString()}{' '}
									{new Date(message?.timestamp).toLocaleTimeString()}
								</div>
							</div>
						)
					);
				})}
				<div ref={messagesEndRef} />
			</div>
			<form className="bg-white p-4" onSubmit={handleSubmit}>
				<Input
					className="w-full p-2 rounded-lg"
					label="Type a message..."
					type="text"
					value={inputValue}
					onChange={event => setInputValue(event.target.value)}
				/>
			</form>
		</div>
	);
};

export default ChatContent;
