import { Input } from '@material-tailwind/react';
import React from 'react';

function ChatContent({
	allMessages,
	users,
	curUserEMAIL,
	messagesEndRef,
	handleSubmit,
	inputValue,
	setInputValue,
}: any) {
	return (
		<div className="flex flex-col flex-grow h-full w-full max-w-7xl shadow-xl rounded-lg overflow-hidden">
			<div className="flex flex-col flex-grow  w-full overflow-auto h-full p-4 px-7 ">
				{allMessages?.map((message: any) => {
					const sender = users.find(
						(user: any) => user.email === message.sender,
					);
					const senderName = sender?.displayName
						.split(' ')
						.map((word: string) => word[0])
						.join('');
					const senderAvatar = sender?.avatar;

					return (
						<div
							key={message.id}
							className={`  flex flex-col p-0 mb-4 ${
								message?.sender === curUserEMAIL ? 'self-end ' : 'self-start '
							}`}
						>
							<div className={` relative`}>
								<span
									className={`flex absolute justify-center rounded-full p-1 w-8 h-8 font-bold bg-black text-white text-sm items-center 
                ${
									message?.sender === curUserEMAIL
										? '-right-5 -top-5'
										: '-left-5 -top-5'
								}
                `}
								>
									{senderName}
								</span>
							</div>

							<div
								className={`message  ${
									message?.sender === curUserEMAIL
										? 'bg-blue-200 '
										: 'bg-red-200 '
								} p-4 rounded`}
							>
								<p className="text-sm text-gray-900 flex justify-center h-full w-full">
									{message?.text}
								</p>
							</div>
							<div
								className={` flex text-xs italic ${
									message?.sender === curUserEMAIL
										? 'justify-end pr-2'
										: 'justify-start pl-2'
								}`}
							>
								{new Date(message.timestamp).toLocaleDateString()}{' '}
								{new Date(message.timestamp).toLocaleTimeString()}
							</div>
						</div>
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
					onChange={(event: any) => setInputValue(event.target.value)}
				/>
			</form>
		</div>
	);
}

export default ChatContent;
