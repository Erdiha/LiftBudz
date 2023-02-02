import React, { useState, useEffect, useRef } from 'react';
import useAuth, { useUserLibrary } from '../../firebase/usefirebaseUI';
import Message from '@/components/messages/MessageList';
import Posts from '../posts/Posts';
import Friends from '../friends/Friends';
import SideMenu from './SideMenu';
import SideFriends from './sideBarContents/SideFriends';
import SideChats from './sideBarContents/SideChats';

import SideProgress from './sideBarContents/SideProgress';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const { getCurrentUser } = useUserLibrary(currentUser!.uid);
  const dashboardRightSide = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dashboardRightSide.current) {
      dashboardRightSide.current.scrollTop =
        dashboardRightSide.current.scrollHeight;
    }
  }, []);

  const Progress = () => {
    return <div className=" w-full h-full p-2  text-black">PROGRESS</div>;
  };

  return (
    <div className="md:grid grid-cols-4 flex w-screen flex-col mt-8 md:mt-16 md:max-w-7xl md:p-4 border-box  h-full ">
      <div className="col-span-1 w-full h-full relative">
        {activeTab === 'posts' && (
          <SideMenu
            {...{
              setActiveTab,
              activeTab,
            }}
          />
        )}
        {activeTab === 'friends' && (
          <SideFriends {...{ setActiveTab, activeTab }} />
        )}
        {activeTab === 'messages' && (
          <SideChats {...{ setActiveTab, activeTab }} />
        )}
        {activeTab === 'progress' && (
          <SideProgress {...{ setActiveTab, activeTab }} />
        )}
      </div>

      <div
        ref={dashboardRightSide}
        className="bg-red-200 col-span-3 p-4  w-full scroll-y-auto overflow-y-auto transisiton-all duration-200 ease-in-out"
      >
        {activeTab === 'posts' && <Posts />}
        {activeTab === 'friends' && <Friends />}
        {activeTab === 'messages' && <Message />}
        {activeTab === 'progress' && <Progress />}
      </div>
    </div>
  );
};

export default Dashboard;
