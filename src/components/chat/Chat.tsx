import React, { useState, useEffect, useRef } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import useAuth from '../../firebase/usefirebaseUI';
import SelectRecipient from './SelectRecipient';
import { useDispatch, useSelector } from 'react-redux';

import { loadChatsFailure, fetchChats, startLoading } from '@/redux/chatsSlice';
import { RootState } from '@/redux/store';
import { db, storage } from '@/firebase/firebase';
import { useGetMessages } from '../data/index';
import Messages from './Messages';
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
  messageUserId,
  setMessageUserId,
  users,
  sendMessageToUser,
  setSendMessageToUser,
}: any) => {
  const { currentUser } = useAuth();
  const curUserEMAIL: any = currentUser?.email;
  const [file, setFile] = useState<File | null>(null);
  //redux calls
  const dispatch: any = useDispatch();

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
  const { allMessages, loading, error } = useGetMessages(
    messageUserId,
    curUserEMAIL,
  );

  const imageREF = useRef<any>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(startLoading());
    if (!messageUserId || (!inputValue && !file)) {
      return;
    }
    const messagesCollectionRef = db.collection('messages');
    let imageUrl = null;
    // If a file is selected, upload it to Firebase Storage
    if (file) {
      const imageName = Date.now() + '_' + file.name; // create a unique image name
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`messages/${imageName}`);
      const uploadTask = fileRef.put(file);
      await uploadTask;

      imageUrl = await fileRef.getDownloadURL();
      imageREF.current = imageUrl;
    }

    const message = {
      text: inputValue,
      conversationId: [currentUser?.email, messageUserId],
      receiverHasRead: false,
      createdAt: serverTimestamp(),
      timestamp: Date.now(),
      image: imageUrl,
      deleteFor: [],
      sender: currentUser?.email,
      receiver: messageUserId,
    };

    try {
      await messagesCollectionRef.add(message);
      dispatch(fetchChats());
      setInputValue(''); // <--- This line
      setFile(null); // <--- This line
    } catch (error: any) {
      dispatch(loadChatsFailure(error.message));
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [inputValue, [], messageUserId]);

  console.log('users', users);
  return (
    <div className='flex flex-col h-[95%] md:h-[90%] w-full absolute top-16 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 p-2 bg-gray-100 '>
      {messageUserId ? (
        <Messages
          allMessages={allMessages}
          users={users}
          curUserEMAIL={curUserEMAIL}
          messagesEndRef={messagesEndRef}
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          messageUserId={messageUserId}
          setSendMessageToUser={setSendMessageToUser}
          setFile={setFile}
          isLoadingChat={isLoadingChat}
          file={file}
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
