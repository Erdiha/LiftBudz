import React, { useRef, useState } from 'react';
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai';
import { IPost } from './types';
import Comments from './Comments';
import EditPost from './EditPost';
import Reply from './Reply';
import { useGetAvatar } from '@/hooks/useFetch';
import useFindUser from '../../hooks/useFindUser';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { db } from '@/firebase/firebase';
import { Avatar } from '@material-tailwind/react';
import { useTimeAgo } from '../../hooks/useDate';

const Postcard = (post: IPost) => {
  const { currentUser } = useAuth();
  const { getCurrentUser } = useUserLibrary(currentUser?.uid)!;
  const [openComment, setOpenComment] = React.useState(false);

  const timeAgo = useTimeAgo(post.timeStamp);

  const handleLikes = async () => {
    const commentRef = db.collection('posts').doc(post.id);
    try {
      const postData: any = await commentRef.get();
      if (postData.exists) {
        const likes: any = postData.data().likes || [];
        const index: number | null = likes.indexOf(getCurrentUser?.email);
        if (index === -1) {
          likes.push(getCurrentUser?.email);
        } else {
          likes.splice(index, 1);
        }
        await commentRef.update({ likes });
      } else {
        alert("Document doesn't exist.");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div key={post.id} className='flex w-full p-4 py-8 '>
      <div className='flex flex-col border shadow-md overflow-y-auto w-full ring-1 ring-gray-300 md:p-1'>
        <div className='w-full flex flex-col bg-gradient   rounded  ring-gray-900/10  h-full'>
          <div className='flex flex-col w-full '>
            <div className='flex  w-full relative '>
              <div className='w-fit p-2 rounded shadow-md flex pl-4 gap-2 md:bg-gray-100'>
                <Avatar src={useFindUser(post?.uid)?.imageUrl} />
                <span className='text-xs text-gray-500 flex  flex-col justify-end'>
                  <span className='font-semibold text-blue-gray-800 text-[15px] flex flex-col'>
                    {useFindUser(post?.uid)?.displayName}
                  </span>
                  <span className='text-[12px] text-gray-600 italic font-light'>
                    {timeAgo}
                  </span>
                </span>
              </div>
              <div className='flex self-end absolute right-10 top-[50%] -translate-y-1/2'>
                {currentUser?.uid === post?.uid && <EditPost post={post} />}
              </div>
            </div>

            {post?.photoURL && (
              <img
                src={post?.photoURL}
                alt='post image'
                className='max-w-full w-full max-h-96  object-cover rounded p-2'
              />
            )}
          </div>
          <div className='w-full h-fit flex flex-col pr-[1.1rem] pt-1 bg-white rounded pl-2 '>
            {post?.text && (
              <p className='text-base text-start col-span-9 text-gray-800 p-2 flex-wrap break-words'>
                {post?.text}
              </p>
            )}

            <div className='flex w-full text-2xl col-span-1 self-end py-1 gap-4 md:gap-8  md:ml-2 md:px-2 justify-end'>
              <span
                onClick={handleLikes}
                className={`flex items-center cursor-pointer justify-center ${
                  post?.likes?.length > 0 ? 'text-blue-400' : 'text-black'
                }}`}>
                <AiOutlineLike />
                {post?.likes?.length > 0 && (
                  <span className='flex jusfity-center items-center text-sm font-bold text-red-400 min-w-4 cursor-default'>
                    {post?.likes?.length}
                  </span>
                )}
              </span>
              <span
                onClick={() => setOpenComment(true)}
                className={`flex items-center cursor-pointer justify-center ${
                  post?.comments?.length > 0 ? 'text-blue-400' : 'text-black'
                }  ${
                  openComment ? 'animate-bounce text-red-500 scale-105' : ''
                }`}>
                <AiOutlineComment />
                {post?.comments?.length > 0 && (
                  <span className='flex jusfity-center items-center text-sm font-bold text-red-400   min-w-4 cursor-default'>
                    {post?.comments?.length}
                  </span>
                )}
              </span>
            </div>
            {openComment && (
              <Comments
                data={post}
                setOpenComment={setOpenComment}
                post={post}
                types='comment'
              />
            )}
          </div>
          <hr />
          <p className='w-full px-4 mt-2  font-semibold text-gray-700'>
            Comments
          </p>
          <hr />
          {post?.comments?.length > 0 &&
            post?.comments?.map((comment: any, index: number) => (
              <Reply
                key={comment?.id}
                comment={comment}
                post={post}
                index={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Postcard;
