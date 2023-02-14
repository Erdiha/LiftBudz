import React, { useRef } from 'react';
import useAuth from '@/firebase/usefirebaseUI';
import { useUserLibrary } from '../../firebase/usefirebaseUI';
import Avatar from 'avataaars';
import { useGetAvatar } from '@/hooks/useFetch';
import EditPost from './EditPost';
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai';
import { IPost } from './types';
import useFindUser from '../../hooks/useFindUser';
import { db } from '@/firebase/firebase';
import Comment from './Comment';
import { sorting } from '../../utils/helperFuntions';
import { BsTrash } from 'react-icons/bs';

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
        await commentRef.update({
          likes: likes,
        });
      } else {
        console.error("Document doesn't exist.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div key={post.id} className='flex w-full p-8 py-16 '>
      <div className='flex flex-col border shadow-md overflow-y-auto w-full '>
        <div className='w-full flex flex-col bg-gradient  bg-gray-100/90   rounded  ring-gray-900/10  h-full'>
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
                    {post?.createdAt?.toDate()?.toLocaleTimeString()}{' '}
                    {post?.createdAt?.toDate()?.toLocaleDateString()}
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
          <div className='w-full min-h-24   flex px-2 pt-8 flex-col bg-white rounded '>
            <div className='pb-8 p-2 bg-gray-100 h-full rounded-lg'>
              {post?.text && (
                <p className='text-base text-gray-800 w-[80%]'>{post?.text}</p>
              )}
            </div>
            <div className='flex  text-2xl w-[20%]   p-2 px-4  justify-between min-w-40 '>
              <span
                onClick={handleLikes}
                className={`flex items-center cursor-pointer ${post?.likes?.length > 0 ? 'text-blue-400':'text-black'}
                }`}>
               
                  <AiOutlineLike
                 
                  /> {post?.likes?.length > 0 && (
                    <span className='flex jusfity-center items-center text-sm font-bold text-red-400 min-w-4 cursor-default'>
                      {post?.likes?.length}
                    </span>
                  )}
               

               
              </span>
              <span
                onClick={() => setOpenComment(true)}
                className={`flex items-center cursor-pointer ${post?.comments?.length > 0 ? 'text-blue-400':'text-black'}  ${
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
          <section className="flex flex-col bg-orange-300 scroll-y-auto"> {sorting(post?.comments, 'comment','desc').map((comment: any) => {
            return (
              <div key={comment?.id} className='bg-gray-100 p-4 m-4 relative rounded '>
            <div className="flex gap-1 items-center"> 
            <Avatar
                  style={{ width: '20px', height: '20px' }}
                  avatarStyle='Circle'
                  {...getAvatar}
                /> 
                  <h3>{comment?.userName}</h3>
                </div>
                <div>
                  <p className='text-gray-700'>{comment?.text}</p>
                <p className='text-gray-500 text-xs'>
                  {new Date(comment?.timestamp).toLocaleDateString()}{' '}
                  {new Date(comment?.timestamp).toLocaleTimeString()}
                </p></div>
                <div className="absolute -bottom-4 right-4 flex justify-center gap-4 bg-white  rounded p-2 items-center"><button>reply</button><button><AiOutlineLike/></button><button><BsTrash/></button></div>
              </div>
            );
          })}</section>
         

          <div className='flex-1 overflow-y-scroll'></div>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
