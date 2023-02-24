import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../firebase/usefirebaseUI';
import Posts from '../components/posts/Posts';
import Friends from '../components/friends/Friends';
import SideMenu from '../components/dashboard/SideMenu';
import SideFriends from '../components/dashboard/sideBarContents/SideFriends';
import SideChats from '../components/dashboard/sideBarContents/SideChats';
import SideProgress from '../components/dashboard/sideBarContents/SideProgress';
import Chat from '../components/chat/Chat';

import { useGetUsers } from '../components/data';
import { useMediaQuery } from '@react-hook/media-query';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [openChat, setOpenChat] = useState(false);
  const [sendMessageToUser, setSendMessageToUser] = useState(false);
  const [messageUserId, setMessageUserId] = useState();
  const unreadMessages = useRef<number>(0);
  const dashboardRightSide = useRef<HTMLDivElement>(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { users, loading, error } = useGetUsers(currentUser?.email, 'friends');

  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  useEffect(() => {
    if (dashboardRightSide.current) {
      dashboardRightSide.current.scrollTop =
        dashboardRightSide.current.scrollHeight;
    }
  }, []);

  const renderRightSide = () => {
    switch (activeTab) {
      case 'posts':
        return <Posts setOpenSideBar={setOpenSideBar} />;
      case 'friends':
        return <Friends activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'messages':
        return sendMessageToUser ? (
          <Chat
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            sendMessageToUser={sendMessageToUser}
            setSendMessageToUser={setSendMessageToUser}
            messageUserId={messageUserId}
            setMessageUserId={setMessageUserId}
            users={users}
            unreadMessages={unreadMessages}
          />
        ) : (
          <SideChats
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            sendMessageToUser={sendMessageToUser}
            setSendMessageToUser={setSendMessageToUser}
            messageUserId={messageUserId}
            setMessageUserId={setMessageUserId}
            unreadMessages={unreadMessages}
          />
        );
      case 'progress':
        return <div className='w-full h-full p-2 text-black'>PROGRESS</div>;
      default:
        return <div />;
    }
  };

  const renderLeftSide = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <SideMenu
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            setOpenSideBar={setOpenSideBar}
          />
        );
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
            unreadMessages={unreadMessages}
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

  console.log('this is messageUserId', messageUserId);

  return (
    <div
      className={`relative flex w-full md:max-w-7xl h-[94vh]   justify-end items-center ${
        openSideBar ? 'bg-white/50 backdrop-blur' : ''
      }`}>
      <div
        className={` h-screen  z-50  
          ${openSideBar && ' fixed left-0 bottom-0 w-full   bg-black/70'}
            `}>
        <div
          className={`   ${
            openSideBar
              ? 'fixed  left-0 bottom-0  w-[75%] md:w-[30%]  top-10 bg-gray-100   ease-in duration-500 text-black '
              : 'fixed left-[-100%] bottom-0 ease-in-out duration-500'
          }
             `}>
          {' '}
          {renderLeftSide()}
        </div>
        {/* {isSmallScreen && openSideBar && renderLeftSide()} */}
      </div>

      <div
        className={` w-full
          flex justify-center  h-full  text-black overflow-hidden`}>
        {renderRightSide()}
      </div>
    </div>
  );
};
export default Dashboard;
