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

  // useEffect(() => {
  //   if (postRef.current) {
  //     postRef.current.scrollToView = postRef.current.scrollHeight;
  //   }
  // }, [postArray]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot((snapshot) =>
        setPostArray(snapshot.docs.map((doc) => doc.data())),
      );
  }, []);

  return (
    <div className="relative flex flex-col ">
      
      <div className="flex absolute top-0 z-[200] w-full justify-end">
        {openPostFields ? (
          <SendPost setOpenPostFields={setOpenPostFields} />
        ) : (
          <Button className={`middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-tr-none`} onClick={() => setOpenPostFields(true)}>
            POST
          </Button>
        )}
      </div>
      <div
        ref={postRef}
        className="relative overflow-y-auto flex flex-col  scrollbar-hide  md:scrollbar-default scroll-bar h-[65vh] "
      >
        {postArray.map(({ id, text, title, userName, photoURL, uid }: any) => {
          return <PostCard key={id} {...{ id, text, title, photoURL, uid }} />;
        })}
      </div>
    </div>
  );
}

export default Posts;
