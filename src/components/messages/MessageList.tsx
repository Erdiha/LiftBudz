import React, { useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase/fireBase';
import MessageCard from './MessageCard';
import Loading from '@/utils/Loading';
import { useadddb, useFetchDB } from '../../hooks/useFetch';

const MessageList = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const [formValue, setFormValue]: any = useState('');
  const messagesRef: any = db.collection('messages');
  let query: any = messagesRef.orderBy('createdAt').limit(25);
  const [querySnapshot, loading, error] = useCollection(query);
  const messages = useFetchDB('messages', 'asc');

  const sendMessage = async (e: any) => {
    e.preventDefault();
    useadddb(formValue, messagesRef);
    setFormValue('');
    dummy?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex w-full justify-center items-center">
      <MessageCard
        messages={messages}
        setFormValue={setFormValue}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default MessageList;
