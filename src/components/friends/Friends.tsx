import React from 'react';
import UserLists from '../user/UserList';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';

function Friends({ activeTab, setActiveTab }: any) {
  return (
    <div className='w-full h-fit '>
      <UserLists />
    </div>
  );
}

export default Friends;
