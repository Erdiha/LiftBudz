import React from 'react';

import {
  HiUserGroup,
  HiChat,
  HiDocumentText,
  HiTrendingUp,
} from 'react-icons/hi';
import { useMediaQuery } from '@react-hook/media-query';
import { useRouter } from 'next/router';
import { AiFillCloseCircle } from 'react-icons/ai';
import {useEffect} from 'react';
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext';

const SideMenu: React.FC<any> = ({
  setActiveTab,
  activeTab,
  setOpenSideBar,
}: any) => {
  const menuOptions = [
    { title: 'Posts', icon: <HiDocumentText /> },
    { title: 'Messages', icon: <HiChat /> },
    { title: 'Friends', icon: <HiUserGroup /> },
    { title: 'Progress', icon: <HiTrendingUp /> },
  ];

  const handleTabClick = (tab: string) => {
    console.log('this is tab', tab);
    setActiveTab(tab);
    setOpenSideBar((prev: boolean) => !prev);
  };

  const isSmallScreen = useMediaQuery('(max-width: 780px)');
  const router = useRouter();



  return (
    <div className='w-full h-full bg-black/20 shadow-lg flex flex-col'>
      <div className='flex justify-between p-4'>
        <span className='flex flex-col p-4 font-bold text-lg border-b border-gray-200'>
          Menu
        </span>
        <button
          onClick={() => setOpenSideBar((prev: boolean) => !prev)}
          className='hover:scale-105 hover:text-red-400 transition-all ease duration-300'>
          <AiFillCloseCircle size={30} />
        </button>
      </div>
      <div className='flex flex-col p-4'>
        {menuOptions.map((option) => (
          <button
            onClick={() => handleTabClick(option.title.toLowerCase())}
            key={option.title.toLowerCase()}
            className={`${
              activeTab === option.title.toLowerCase()
                ? 'bg-gray-200'
                : 'bg-transparent'
            } flex items-center my-4 cursor-pointer p-2`}>
            {option.icon}
            <span className='ml-2'>{option.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
