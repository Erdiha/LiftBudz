import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../firebase/usefirebaseUI';
import MessageList from '@/components/messages/MessageList';
import Posts from '../posts/Posts';
import Friends from '../friends/Friends';
import SideMenu from './SideMenu';
import SideFriends from './sideBarContents/SideFriends';
import SideChats from './sideBarContents/SideChats';
import SideProgress from './sideBarContents/SideProgress';
import Chat from '../chat/Chat';
import { send } from 'process';
import { getDB } from '@/firebase/fireBase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

const Dashboard: React.FC = () => {
	const { currentUser } = useAuth();
	const [activeTab, setActiveTab] = useState('posts');
	const [openChat, setOpenChat] = useState(false);
	const [sendMessageToUser, setSendMessageToUser] = useState(false);
	const [messageUserId, setMessageUserId] = useState();
	const dashboardRightSide = useRef<HTMLDivElement>(null);
	const [usersData] = useCollection(collection(getDB, 'users'));
	const users = usersData?.docs.map((user: any) => {
		return { id: user.id, ...user.data() };
	});

	useEffect(() => {
		if (dashboardRightSide.current) {
			dashboardRightSide.current.scrollTop =
				dashboardRightSide.current.scrollHeight;
		}
	}, []);

	const renderRightSide = () => {
		switch (activeTab) {
			case 'posts':
				return <Posts />;
			case 'friends':
				return <Friends />;
			case 'messages':
				return (
					sendMessageToUser && (
						<Chat
							setActiveTab={setActiveTab}
							activeTab={activeTab}
							sendMessageToUser={sendMessageToUser}
							setSendMessageToUser={setSendMessageToUser}
							messageUserId={messageUserId}
							setMessageUserId={setMessageUserId}
							users={users}
						/>
					)
				);
			case 'progress':
				return <div className="w-full h-full p-2 text-black">PROGRESS</div>;
			default:
				return <div />;
		}
	};

	const renderLeftSide = () => {
		switch (activeTab) {
			case 'posts':
				return <SideMenu setActiveTab={setActiveTab} activeTab={activeTab} />;
			case 'friends':
				return (
					<SideFriends setActiveTab={setActiveTab} activeTab={activeTab} />
				);
			case 'messages':
				return (
					<SideChats
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						sendMessageToUser={sendMessageToUser}
						setSendMessageToUser={setSendMessageToUser}
						messageUserId={messageUserId}
						setMessageUserId={setMessageUserId}
					/>
				);
			case 'progress':
				return (
					<SideProgress setActiveTab={setActiveTab} activeTab={activeTab} />
				);
			default:
				return <div />;
		}
	};

	return (
		<div className="relative flex mt-[5vh] w-screen md:max-w-7xl border-box h-[90vh] justify-center items-center">
			<div className="w-1/3 h-full p-2 text-black m-auto">
				{renderLeftSide()}
			</div>
			<div className="w-3/4 h-full p-2 text-black">{renderRightSide()}</div>;
		</div>
	);
};
export default Dashboard;
