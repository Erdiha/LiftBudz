import React, { useState, useEffect, useRef } from 'react';
import useAuth, { useUserLibrary } from '../../firebase/usefirebaseUI';
import Link from 'next/link';
import message from '@/components/messages/Message';
import Message from '@/components/messages/Message';
import { RxDashboard } from 'react-icons/rx';
import { FaUserFriends } from 'react-icons/fa';
import { IoBarChartOutline } from 'react-icons/io5';
import { TbMessages } from 'react-icons/tb';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Textarea,
} from '@material-tailwind/react';
import {
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import Posts from '../posts/Posts';
import Friends from '../friends/Friends';
const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const { getCurrentUser } = useUserLibrary(currentUser!.uid);
  const dashboardRightSide = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(dashboardRightSide.current);
    if (dashboardRightSide.current) {
      dashboardRightSide.current.scrollTop =
        dashboardRightSide.current.scrollHeight;
    }
  }, []);

  const sideMenu = () => {
    return (
      <div className=" p-8 bg-gray-900 pt-10">
        <div className="h-fit w-fit flex items-center text-gray-300">
          {getCurrentUser?.displayName}
        </div>

        <div className="md:flex flex-col grid grid-cols-2 mt-4 md:mt-12 text-sm md:text-md">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex w-full justify-between rounded p-2  hover:text-gray-500 cursor-pointer items-center md:mb-6 ${
              activeTab === 'posts'
                ? 'text-gray-300 border-[1px] border-white'
                : 'text-gray-500'
            } `}
          >
            <div className="flex items-center">
              <RxDashboard />
              <span className="text-sm  m-2">Dashboard</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex w-full justify-between p-2  hover:text-gray-500 cursor-pointer items-center md:mb-6 ${
              activeTab === 'friends'
                ? 'text-gray-300 border-[1px] border-white'
                : 'text-gray-500 border-none '
            } `}
          >
            <div className="flex items-center">
              <FaUserFriends />
              <span className="text-sm  m-2">Friends</span>
            </div>
            <div className="py-1 px-3 bg-gray-700 rounded flex items-center justify-center text-xs">
              8
            </div>
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex w-full justify-between  p-2 hover:text-gray-500 cursor-pointer items-center md:mb-6 ${
              activeTab === 'progress'
                ? 'text-gray-300 border-[1px] border-white'
                : 'text-gray-500 border-none '
            }`}
          >
            <div className="flex items-center">
              <IoBarChartOutline />
              <span className="text-sm  m-2">Progress</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={` flex w-full justify-between p-2  hover:text-gray-500 cursor-pointer items-center md:mb-6 ${
              activeTab === 'messages'
                ? 'text-gray-300 border-[1px] border-white'
                : 'text-gray-500 border-none '
            }`}
          >
            <div className="flex items-center">
              <TbMessages />
              <span className="text-sm  m-2">Messages</span>
            </div>
            <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
              8
            </div>
          </button>
        </div>
      </div>
    );
  };

  const Progress = () => {
    return <div className=" w-full h-full p-2  text-black">PROGRESS</div>;
  };

  return (
    <div className="md:grid grid-cols-4 flex w-screen flex-col mt-8 md:mt-16 md:max-w-7xl md:p-4 border-box   ">
      <div className="col-span-1 w-full ">{sideMenu()}</div>

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
