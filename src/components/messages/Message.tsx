import React, { useState, useRef, useEffect } from 'react';
import {
  useCollectionData,
  useCollection,
} from 'react-firebase-hooks/firestore';
import { auth, db, firebase } from '../../firebase/fireBase';
import MessageCard from './MessageCard';
import Loading from '@/utils/Loading';
import UserLists from '../user/UserList';

function MessageList() {
  const dummy: any = useRef();
  const [formValue, setFormValue]: any = useState();
  const messagesRef: any = db.collection('messages');

  let query: any = messagesRef.orderBy('createdAt').limit(25);

  const [querySnapshot, loading, error] = useCollection(query);

  const messages = querySnapshot
    ? querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          ...data,
        };
      })
    : [];

  console.log(messages);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const { uid, photoURL }: any = auth.currentUser;
    formValue !== '' &&
      (await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      }));

    setFormValue('');
    dummy?.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const form = (
    <div className="w-full h-[50%] bg-blue-gray-100">
      <form action="" onSubmit={sendMessage}>
        <input type="text" onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">send</button>
      </form>
    </div>
  );

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
    <div className="flex   w-full max-h-[90vh] h-[50rem] justify-center items-center">
      <MessageCard
        messages={messages}
        setFormValue={setFormValue}
        form={form}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default MessageList;
