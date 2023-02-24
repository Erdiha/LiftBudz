import React, { useRef, useState } from 'react';
import PostCard from './PostCard';
import SendPost from '../posts/SendPost';
import { Button } from '@material-tailwind/react';
import { IPost } from './types';
import { db } from '@/firebase/firebase';
import { mockposts } from '../data/data';

function Posts({ setOpenSideBar }: any) {
  const [openPostFields, setOpenPostFields] = useState<boolean>(false);
  const [posts, setPosts]: any = useState<any>(mockposts);
  const postRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
  //const posts: IPost[] = useFetchDB('posts', 'desc');
  return (
    <div className='flex flex-col h-full relative w-full'>
      <div className='flex  z-200 w-full justify-end pt-14 '>
        {openPostFields ? (
          <SendPost setOpenPostFields={setOpenPostFields} />
        ) : (
          <div className='flex flex-row justify-between w-full px-8 pb-4 '>
            <Button
              className='  '
              variant='gradient'
              onClick={() => setOpenPostFields(true)}>
              POST
            </Button>
            <Button
              onClick={() => setOpenSideBar((prev: boolean) => !prev)}
              className='justify-start'
              variant='gradient'>
              Menu
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
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
