import Link from 'next/link';
import React from 'react';
import { Button } from '@material-tailwind/react';
import { useFetchDB } from '@/hooks/useFetch';
import useAuth from '@/firebase/usefirebaseUI';

function SideChats({ activeTab, setActiveTab }: any) {
  const { currentUser } = useAuth();
  const messages = useFetchDB('messages', 'asc');
  console.log(messages, currentUser?.uid);
  return (
    <div className="flex flex-col bg-orange-300  top-0  absolute bottom-0 right-0 left-0 p-8 gap-2">
      <Button onClick={() => setActiveTab('posts')}>BACK</Button>
      <div className="flex-flex-col bg-white w-full h-full rounded-lg p-1">
        <p>CHATS</p>
        <ul>{messages}</ul>
      </div>
    </div>
  );
}

export default SideChats;
