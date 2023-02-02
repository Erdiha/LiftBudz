import React, { useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/fireBase';
import MessageCard from './MessageCard';
import Loading from '@/utils/Loading';
import { useAddDB, useFetchDB } from '../../hooks/useFetch';

function MessageList() {
  const dummy: any = useRef();
  const [formValue, setFormValue]: any = useState();
  const messagesRef: any = db.collection('messages');
  let query: any = messagesRef.orderBy('createdAt').limit(25);
  const [querySnapshot, loading, error] = useCollection(query);
  const messages = useFetchDB('messages', 'asc');

  const sendMessage = async (e: any) => {
    await useAddDB(formValue, e, messagesRef);
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
}

export default MessageList;
