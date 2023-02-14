import { useGetAvatar } from '@/hooks/useFetch';
import React, { FC } from 'react';
import Avatar from 'avataaars';
import { AiOutlineLike } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import useAuth from '@/firebase/usefirebaseUI';

interface CommentProps {
  comment: any;
  mright?: number;
  mleft?: number;
  done?: boolean;
}

const Reply: FC<CommentProps> = ({
  comment,
  mright = 1,
  mleft = 0,
  done = false,
}) => {
  const getAvatar = useGetAvatar();
  const { currentUser } = useAuth();
  return (
    <section className='flex flex-col'>
      <div className='flex flex-col mb-3'>
        <div
          key={comment?.id}
          className=' m-3 p-3 relative rounded group md:hover:shadow-md'
          style={{
            marginLeft: `${mright * 10}px`,
            paddingRight: `${mleft * 30}px`,
          }}>
          <div className='flex gap-1 items-center '>
            <Avatar
              style={{ width: '50px', height: '50px' }}
              avatarStyle='Circle'
              {...getAvatar}
            />
            <div>
              {' '}
              <h3 className='font-roboto'>{comment?.userName}</h3>
              <div>
                <p className='text-gray-700'>{comment?.text}</p>
              </div>
            </div>
          </div>

          <div className='absolute bottom-0 right-4 flex gap-8'>
            {' '}
            <button className='md:hover:scale-110 md:hover:bg-blue-gray-100 p-1 rounded-md md:hover:drop-shadow-md'>
              reply
            </button>
            <button>
              <AiOutlineLike />
            </button>
          </div>
          {comment?.sender === currentUser?.email && (
            <div className='absolute top-4 right-4 hidden group-hover:flex justify-center gap-4  rounded p-2 items-center'>
              <button>
                <BsTrash />
              </button>
            </div>
          )}
        </div>
        {comment?.reply?.length > 0 &&
          comment?.reply?.map((reply: any) => {
            return (
              <Reply
                key={reply?.id}
                comment={reply}
                mright={mright + 3}
                mleft={mleft - 1}
                done={true}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Reply;
