import React, { useRef, useState } from 'react';
import PostCard from './PostCard';
import SendPost from '../posts/SendPost';
import { Button } from '@material-tailwind/react';
import { useFetchDB } from '../../hooks/useFetch';
import { IPost } from './types';
import { toast } from 'react-toastify';
import { db } from '@/firebase/firebase';
import { mockposts } from '../data/data';
import Link from 'next/link';

function Posts() {
  const [openPostFields, setOpenPostFields] = useState<boolean>(false);
  const [posts, setPosts]: any = useState<any>(mockposts);
  const postRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const unsubscribe = db.collection('posts').onSnapshot((snapshot) => {
      const postsData: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPosts(mockposts);
    });

    return () => unsubscribe();
  }, [openPostFields, []]);
  //const posts: IPost[] = useFetchDB('posts', 'desc');
  return (
    <div className='flex flex-col h-full relative'>
      <div className='flex  z-200 w-full justify-end pt-14 '>
        {openPostFields ? (
          <SendPost setOpenPostFields={setOpenPostFields} />
        ) : (
          <>
            {' '}
            <Button
              className='w-full text-xl p-1 mb-4 hidden md:flex  justify-center'
              variant='gradient'
              onClick={() => setOpenPostFields(true)}>
              POST
            </Button>
            <div className='flex flex-row justify-between w-full px-8 pb-4 md:hidden'>
              <Link href='../'>
                <Button className='justify-start' variant='gradient'>
                  BACK
                </Button>
              </Link>
              <Button
                className='md:w-full md:text-xl md:p-1 md:mb-4 '
                variant='gradient'
                onClick={() => setOpenPostFields(true)}>
                POST
              </Button>
            </div>
          </>
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
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
