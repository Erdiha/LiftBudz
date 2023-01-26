import React, { useState, useEffect } from 'react';
import useAuth from '../../firebase/usefirebaseUI';
import Link from 'next/link';
import message from '@/components/messages/Message';
import Message from '@/components/messages/Message';

const Homepage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="max-w-[90%] h-screen p-4 grid grid-cols-[20%,75%] scroll-x-none">
      <div className="">
        {' '}
        <aside
          id="logo-sidebar"
          className="w-64 fixed left-0 top-10  transition-transform -translate-x-full sm:translate-x-0 z-40 pt-20 border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 justify-center flex"
          aria-label="Sidebar"
        >
          <div className="flex flex-col min-h-10 justify-between gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="border-2 p-2  hover:bg-blue-gray-200"
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className="border-2 p-2  hover:bg-blue-gray-200"
            >
              Friends
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className="border-2 p-2  hover:bg-blue-gray-200"
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className="border-2 p-2  hover:bg-blue-gray-200"
            >
              Progress
            </button>
          </div>
        </aside>
      </div>

      <div className="sm:ml-64 scroll-y-auto min-w-fuull min-h-full ">
        <div className="m-4 p-4 border-dashed border-gray-200 dark:border-gray-700 border-2 rounded-lg mt-20 w-fu;">
          {activeTab === 'dashboard'}
          {activeTab === 'friends'}
          {activeTab === 'messages' && <Message />}
          {activeTab === 'progress'}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
