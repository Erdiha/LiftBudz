import React, { useRef, useState } from 'react';
import Avatar from 'avataaars';
import { AiOutlineLike, AiOutlineComment, BsTrash } from 'react-icons/all';
import { IPost } from './types';
import Comment from './Comment';
import EditPost from './EditPost';
import Reply from './Reply';
import { useGetAvatar } from '@/hooks/useFetch';
import useFindUser from '../../hooks/useFindUser';
import { sorting } from '../../utils/helperFuntions';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { db } from '@/firebase/firebase';

const Postcard = (post: IPost) => {
  const { currentUser } = useAuth();
  const { getCurrentUser } = useUserLibrary(currentUser?.uid)!;
  const likesREF = useRef<any>(null);
  const getAvatar = useGetAvatar();
  const [openComment, setOpenComment] = React.useState(false);

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
  console.log('this is mockpost', post);
  return (
    <div key={post.id} className='flex w-full p-8 py-8 '>
      <div className='flex flex-col border shadow-md overflow-y-auto w-full '>
        <div className='w-full flex flex-col bg-gradient   rounded  ring-gray-900/10  h-full'>
          <div className='flex flex-col w-full '>
            <div className='flex items-center w-full  h-24'>
              <div className='w-[85%] flex pl-4'>
                <Avatar
                  style={{ width: '50px', height: '50px' }}
                  avatarStyle='Circle'
                  {...getAvatar}
                />
                <span className='text-xs text-gray-500 flex  flex-col justify-end'>
                  <span className='font-semibold text-blue-gray-800 flex flex-col'>
                    {useFindUser(post?.uid)?.displayName}
                  </span>
                  <span className='text-[12px] text-gray-600 italic font-light'>
                    {/* {post?.createdAt?.toDate()?.toLocaleTimeString()}{' '}
                    {post?.createdAt?.toDate()?.toLocaleDateString()} */}
                  </span>
                </span>
              </div>
              <div className='ml-10'>
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
          <div className='w-full min-h-24   flex px-2 pt-1 flex-col bg-white rounded '>
            <div className='pb-8 p-2  h-full rounded-lg'>
              {post?.text && (
                <p className='text-base text-gray-800 w-[80%]'>{post?.text}</p>
              )}
            </div>
            <div className='flex  text-2xl w-[20%]   p-2 px-4  justify-between min-w-40 '>
              <span
                onClick={handleLikes}
                className={`flex items-center cursor-pointer ${
                  post?.likes?.length > 0 ? 'text-blue-400' : 'text-black'
                }
                }`}>
                <AiOutlineLike />{' '}
                {post?.likes?.length > 0 && (
                  <span className='flex jusfity-center items-center text-sm font-bold text-red-400 min-w-4 cursor-default'>
                    {post?.likes?.length}
                  </span>
                )}
              </span>
              <span
                onClick={() => setOpenComment(true)}
                className={`flex items-center cursor-pointer ${
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
              <Comment post={post} setOpenComment={setOpenComment} />
            )}
          </div>

          {post?.comments?.length > 0 &&
            post?.comments?.map((comment: any) => (
              <Reply key={comment?.id} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Postcard;
