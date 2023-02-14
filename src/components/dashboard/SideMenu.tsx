import React from 'react';
import {
  HiUserGroup,
  HiChat,
  HiDocumentText,
  HiTrendingUp,
} from 'react-icons/hi';
import { useMediaQuery } from '@react-hook/media-query';
import { useRouter } from 'next/router';

const SideMenu: React.FC<any> = ({ setActiveTab, activeTab }: any) => {
  const menuOptions = [
    { title: 'Posts', icon: <HiDocumentText /> },
    { title: 'Messages', icon: <HiChat /> },
    { title: 'Friends', icon: <HiUserGroup /> },
    { title: 'Progress', icon: <HiTrendingUp /> },
  ];

  const handleTabClick = (tab: string) => {
    console.log('this is tab', tab);
    setActiveTab(tab);
  };

  const renderMenuOptions = () => {
    return menuOptions.map((option, index) => (
      <button
        onClick={() => handleTabClick(option.title.toLowerCase())}
        key={index}
        className={` ${
          activeTab === option.title.toLowerCase()
            ? 'bg-gray-200'
            : 'bg-transparent'
        } flex items-center my-4 cursor-pointer p-2 md:hover:backdrop-blur-md md:hover:bg-gray-200`}>
        {option.icon}
        <span className='ml-2'>{option.title}</span>
      </button>
    ));
  };

  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  return (
    <div
      className={`${
        isSmallScreen
          ? 'fixed top-[8vh] left-0 h-full translate-y-[100%] bg-red-200 z-10 '
          : 'w-full h-full bg-white shadow-lg flex flex-col'
      }`}>
      <div className='flex p-4 font-bold text-lg border-b border-gray-200'>
        Menu
      </div>
      <div className='flex flex-col p-4 '>{renderMenuOptions()}</div>
    </div>
  );
};

export default SideMenu;
