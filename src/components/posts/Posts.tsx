import React, { useRef, useState } from 'react';
import { auth, db } from '@/firebase/fireBase';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostCard from './PostCard';
import { useEffect } from 'react';
import { updateCurrentUser } from 'firebase/auth';
import SendPost from '../posts/SendPost';
import { Button } from '@material-tailwind/react';

function Posts() {
  const [postArray, setPostArray]: any = useState([]);
  const [openPostFields, setOpenPostFields] = useState<boolean>(false);
  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (postRef.current) {
      postRef.current.scrollTop = postRef.current.scrollHeight;
    }
  }, [postArray]);
  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt')
      .limit(50)
      .onSnapshot((snapshot) =>
        setPostArray(snapshot.docs.map((doc) => doc.data())),
      );
  }, []);
  console.log('post array', postArray);
  return (
    <>
      <div
        ref={postRef}
        className=" overflow-y-auto flex flex-col h-[50rem] scrollbar-hide md:scrollbar-default scroll-bar"
      >
        {postArray.map(({ id, text, title, userName, photoURL, uid }: any) => {
          return <PostCard key={id} {...{ id, text, title, photoURL, uid }} />;
        })}
      </div>
      <div className="flex w-full justify-end">
        {openPostFields ? (
          <SendPost setOpenPostFields={setOpenPostFields} />
        ) : (
          <Button className="  " onClick={() => setOpenPostFields(true)}>
            POST
          </Button>
        )}
      </div>
    </>
  );
}

export default Posts;
