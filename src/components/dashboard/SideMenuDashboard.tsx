import { RxDashboard } from 'react-icons/rx';
import { FaUserFriends } from 'react-icons/fa';
import { IoBarChartOutline } from 'react-icons/io5';
import { TbMessages } from 'react-icons/tb';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { IActiveTabs, ITabs } from './types';

export const SideMenu: React.FC<IActiveTabs> = ({
  setActiveTab,
  activeTab,
}) => {
  const { currentUser } = useAuth();
  const { getCurrentUser } = useUserLibrary(currentUser!.uid);

  const tabs: ITabs[] = [
    { tabName: 'posts', name: 'Dashboard', icon: <RxDashboard /> },
    { tabName: 'friends', name: 'Friends', icon: <FaUserFriends /> },
    { tabName: 'progress', name: 'Progress', icon: <IoBarChartOutline /> },
    { tabName: 'messages', name: 'Messages', icon: <TbMessages /> },
  ];

  return (
    <div className=" p-8 bg-gray-900 pt-10">
      <div className="h-fit w-fit flex items-center text-gray-300">
        {getCurrentUser?.displayName}
      </div>
      <div className="md:flex flex-col grid grid-cols-2 mt-4 md:mt-12 text-sm md:text-md">
        {tabs.map((tab, index: number) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab.tabName)}
            className={`flex w-full justify-between p-2  hover:text-gray-500 cursor-pointer items-center md:mb-6 ${
              activeTab === tab.tabName
                ? 'text-gray-300 border-[1px] border-white'
                : 'text-gray-500 border-none '
            } `}
          >
            <div className="flex items-center">
              <span className="text-sm  m-2">{tab.name}</span>
            </div>
            {tab.notification && (
              <div className="py-1 px-3 bg-gray-700 rounded flex items-center justify-center text-xs">
                {tab?.notification}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
