import React, { useState, useEffect } from 'react';
import useAuth from '../../firebase/usefirebaseUI';
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
const Homepage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  const sideMenu = () => {
    return (
      <div className=" p-8  bg-gray-800">
        <div className="h-fit w-fit flex items-center text-gray-300">NAME</div>

        <div className="mt-12 text-sm md:text-md">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex w-full justify-between rounded p-2  hover:text-gray-500 cursor-pointer items-center mb-6 ${
              activeTab === 'posts'
                ? 'text-gray-300 border-[2px] border-white'
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
            className={`flex w-full justify-between p-2  hover:text-gray-500 cursor-pointer items-center mb-6 ${
              activeTab === 'friends'
                ? 'text-gray-300 border-[2px] border-white'
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
            className={`flex w-full justify-between  p-2 hover:text-gray-500 cursor-pointer items-center mb-6 ${
              activeTab === 'progress'
                ? 'text-gray-300 border-[2px] border-white'
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
            className={` flex w-full justify-between p-2  hover:text-gray-500 cursor-pointer items-center mb-6 ${
              activeTab === 'messages'
                ? 'text-gray-300 border-[2px] border-white'
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

  const slideMenu = () => {
    return (
      <div className="w-96">
        <Tabs value="app">
          <TabsHeader>
            <Tab value="app">
              <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
              App
            </Tab>
            <Tab value="message">
              <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
              Message
            </Tab>
            <Tab value="settings">
              <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
              Settings
            </Tab>
          </TabsHeader>
        </Tabs>
      </div>
    );
  };

  const Progress = () => {
    return <div className=" w-full h-full p-2  text-black">PROGRESS</div>;
  };

  return (
    <div className="grid grid-cols-4 w-screen  mt-16 max-w-7xl p-4 border-box max-h-[90vh]">
      <div className="col-span-1 ">{sideMenu()}</div>

      <div className="col-span-3 block w-full  relative">
        <div className=" rounded  scroll-y-auto">
          {activeTab === 'posts' && <Posts />}
          {activeTab === 'friends' && <Friends />}
          {activeTab === 'messages' && <Message />}
          {activeTab === 'progress' && <Progress />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
