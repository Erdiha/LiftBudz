import React, { useRef, useState, useEffect } from 'react';
import PostCard from './PostCard';
import SendPost from '../posts/SendPost';
import { Button } from '@material-tailwind/react';
import { IPost } from './types';
import { db } from '@/firebase/firebase';
import {} from '../data/data';
import { toast } from 'react-toastify';

function Posts({ setOpenSideBar }: any) {
  const [openPostFields, setOpenPostFields] = useState<boolean>(false);
  const [posts, setPosts]: any = useState<any>();
  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = db
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const postsData: any = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setPosts(postsData);
      });

    return () => unsubscribe();
  }, []);

  console.log('this is in posts', posts);
  return (
    <div className='flex flex-col h-full relative w-full'>
      <div className='flex  w-full justify-end pt-14 mt-4 '>
        {openPostFields ? (
          <SendPost setOpenPostFields={setOpenPostFields} />
        ) : (
          <div className='flex flex-row justify-between w-full gap-2 p-2'>
            <Button
              onClick={() => {
                setOpenSideBar((prev: boolean) => !prev);
              }}
              className='flex justify-center items-center w-full h-full md:w-[25%]'
              variant='gradient'>
              Menu
            </Button>
            <Button
              className='  w-full h-full'
              variant='gradient'
              onClick={() => setOpenPostFields(true)}>
              POST
            </Button>
          </div>
        )}
      </div>
      <div
        ref={postRef}
        className='relative overflow-y-auto flex flex-col scrollbar-hide md:scrollbar-default scroll-bar'>
        {posts?.map((post: IPost) => (
          <PostCard
            id={post.id}
            key={post.id}
            text={post.text}
            photoURL={post.photoURL}
            uid={post.uid}
            createdAt={post.createdAt}
            likes={post.likes}
            comments={post.comments}
            timeStamp={post.timeStamp}
            subComments={post.subComments}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
