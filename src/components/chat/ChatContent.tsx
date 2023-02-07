import { Input } from '@material-tailwind/react';
import React from 'react';

// type Props = {
// 	allMessages: any[];
// 	users: any[];
// 	curUserEMAIL: string | null | undefined;
// 	messagesEndRef: any;
// 	handleSubmit: (event: any) => void;
// 	inputValue: string;
// 	setInputValue: (value: string) => void;
// 	messageUserId: any;
// };

const ChatContent = ({
	allMessages,
	users,
	curUserEMAIL,
	messagesEndRef,
	handleSubmit,
	inputValue,
	setInputValue,
	messageUserId,
}: any) => {
	console.log(allMessages);
	return (
		<div className="flex  flex-col h-full w-full max-w-7xl shadow-xl rounded-lg overflow-hidden">
			<div className="flex flex-col w-full overflow-auto h-full p-6 px-7 font-sans">
				{allMessages?.map((message: any) => {
					const sender = users.find(
						(user: any) => user.email === message.conversationId[0]
					);
					const senderName = sender?.displayName
						.split(' ')
						.map((word: any) => word[0])
						.join('');

					return (
						message.conversationId.includes(curUserEMAIL && messageUserId) && (
							<div
								key={message.id}
								className={`flex flex-col p-0 mb-4 ${
									message.conversationId[0] === curUserEMAIL
										? 'self-end'
										: 'self-start'
								}`}
							>
								<div className="relative">
									<span
										className={`flex absolute border-[1px] border-blue-gray-400 bg-blue-gray-50 justify-center rounded-full p-2 w-8 h-8 font-bold  text-gray-800 items-center ${
											message.conversationId[0] === curUserEMAIL
												? '-right-5 -top-5'
												: '-left-5 -top-5'
										}`}
									>
										{senderName}
									</span>
								</div>
								<div
									className={`message p-4 rounded border-2  border-blue-gray-600 ${
										message.conversationId[0] === curUserEMAIL
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
										message.conversationId[0] === curUserEMAIL
											? 'justify-end pr-2'
											: 'justify-start pl-2'
									}`}
								>
									{new Date(message.timestamp).toLocaleDateString()}{' '}
									{new Date(message.timestamp).toLocaleTimeString()}
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
