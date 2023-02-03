import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useFetchDB } from '@/hooks/useFetch';
import useAuth from '@/firebase/usefirebaseUI';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getDB } from '@/firebase/fireBase';
import Avatar from 'avataaars';

function SideChats({
  setActiveTab,
  activeTab,
  sendMessageToUser,
  setSendMessageToUser,
  messageUserId,
  setMessageUserId,
}: any) {
  const { currentUser } = useAuth();
  const messages = useFetchDB('messages', 'asc');

  const [usersData] = useCollection(collection(getDB, 'users'));
  const users = usersData?.docs.map((user: any) => ({
    id: user.id,
    ...user.data(),
  }));
  console.log('curretnUSer', currentUser);
  return (
    <div className="flex flex-col md:h-full  bg-orange-300 bottom-0 w-full  p-8 gap-2 top-16 md:top-0 md:relative absolute">
      <Button
        className="w-16 flex justify-center"
        onClick={() => setActiveTab('posts')}
      >
        BACK
      </Button>
      <div className="flex-flex-col bg-white w-full h-full rounded-lg p-1 scroll-y-auto">
        <div className="grid grid-flow-row gap-2 justify-center p-1 rounded">
          {users?.map((user: any) => {
            return (
              <div
                key={user?.id}
                className="flex items-center p-1 bg-blue-gray-50"
              >
                <Avatar
                  style={{ width: '80px', height: '80px' }}
                  {...user.photoURL}
                  avatarStyle="Circle"
                />
                <div className="pl-2">
                  <div className="font-semibold">
                    <button
                      onClick={() => setMessageUserId(user?.userId)}
                      className="hover:underline"
                    >
                      {user?.displayName}
                    </button>
                  </div>
                  <div className="text-xs text-gray-600">Online</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button onClick={() => setSendMessageToUser(true)}>New Chat</Button>
    </div>
  );
}

export default SideChats;
