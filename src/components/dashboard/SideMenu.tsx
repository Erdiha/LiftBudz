import { RxDashboard } from 'react-icons/rx';
import { FaUserFriends } from 'react-icons/fa';
import { IoBarChartOutline } from 'react-icons/io5';
import { TbMessages } from 'react-icons/tb';
import { IActiveTabs, ITabs } from './types';
import Segments from './Segments';
import Chats from './sideBarContents/SideChats';

const SideMenu: React.FC<IActiveTabs> = ({ setActiveTab, activeTab }) => {
	const tabs: ITabs[] = [
		{ tabName: 'posts', name: 'Dashboard', icon: <RxDashboard /> },
		{ tabName: 'friends', name: 'Friends', icon: <FaUserFriends /> },
		{ tabName: 'progress', name: 'Progress', icon: <IoBarChartOutline /> },
		{ tabName: 'messages', name: 'Messages', icon: <TbMessages /> },
	];

	return (
		<div className=" p-8 bg-gray-900 pt-10  h-full ">
			<Segments {...{ setActiveTab, activeTab, tabs }} />
		</div>
	);
};
export default SideMenu;
