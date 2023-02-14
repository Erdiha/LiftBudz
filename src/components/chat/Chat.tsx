import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import useAuth from '../../firebase/usefirebaseUI';
import SelectRecipient from './SelectRecipient';
import ChatContent from './ChatContent';
import { useDispatch, useSelector } from 'react-redux';

import {
  startLoading,
  loadChatsSuccess,
  loadChatsFailure,
  fetchChats,
} from '@/redux/chatsSlice';
import { RootState } from '@/redux/store';
import { loadUsersFailure } from '../../redux/usersSlice';
import { fetchUsers } from '../../redux/usersSlice';
import { mockmessages } from '../data/data';
interface IMessage {
  conversationId: string[];
  timestamp: any;
  receiverHasRead: boolean;
  text: string;
  image?: string;
}

const Chat = ({
  setActiveTab,
  activeTab,
  sendMessageToUser,
  setSendMessageToUser,
  messageUserId,
  setMessageUserId,
}: any) => {
  const { currentUser } = useAuth();
  const curUserEMAIL: any = currentUser?.email;

  //redux calls
  const dispatch: any = useDispatch();
  const allMessages = useSelector((state: RootState) => state.chats.chats);
  const users = useSelector((state: RootState) => state.users.users);
  const isLoadingChat = useSelector(
    (state: RootState) => state.chats.isLoading,
  );
  const isLoadingUsers = useSelector(
    (state: RootState) => state.users.isLoading,
  );
  const errorChat = useSelector((state: RootState) => state.chats.error);
  const errorUsers = useSelector((state: RootState) => state.users.error);
  const [inputValue, setInputValue] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!messageUserId || !inputValue) {
      return;
    }

    const message = {
      text: inputValue,
      conversationId: [currentUser?.email, messageUserId],
      receiverHasRead: false,
      createdAt: serverTimestamp(),
      timestamp: Date.now(),
      image: null,
      deleteFor: [],
      sender: currentUser?.email,
      receiver: messageUserId,
    };
    try {
      dispatch(fetchChats());
      setInputValue('');
    } catch (error: any) {
      dispatch(loadChatsFailure(error.message));
    }
  };

  useEffect(() => {
    dispatch(fetchChats());
    dispatch(fetchUsers());
    dispatch(loadChatsFailure);
    dispatch(loadUsersFailure);
  }, [dispatch]);
  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [inputValue, [], messageUserId]);

  console.log('users', users);
  return (
    <div className='flex flex-col h-full w-full bg-blue-gray-50 relative mt-10'>
      {messageUserId ? (
        <ChatContent
          allMessages={allMessages}
          users={users}
          curUserEMAIL={curUserEMAIL}
          messagesEndRef={messagesEndRef}
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          messageUserId={messageUserId}
        />
      ) : (
        <SelectRecipient
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          setMessageUserId={setMessageUserId}
          loading={isLoadingUsers}
          error={errorUsers}
          users={users}
          curUserEMAIL={curUserEMAIL}
          setSendMessageToUser={setSendMessageToUser}
        />
      )}
    </div>
  );
};

export default Chat;
