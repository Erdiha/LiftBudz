import React, { FC } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import useAuth from '@/firebase/usefirebaseUI';
import { Avatar } from '@material-tailwind/react';
import useFindUser from '../../hooks/useFindUser';
import { useTimeAgo } from '../../hooks/useDate';
import Comments from './Comment';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
interface CommentProps {
  comment: any;
  mright?: number;
  mleft?: number;
  done?: boolean;
  post?: any;
  index?: any;
}

const Reply: FC<CommentProps> = ({
  comment,
  mright = 1,
  mleft = 0,
  done = false,
  post,
  index,
}: CommentProps) => {
  const { currentUser } = useAuth();
  const timeAgo = useTimeAgo(comment?.timeStamp);
  const [openReply, setOpenReply] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  //const postOwner = useFindUser(comment?.uid)?.
  console.log('subcomments length', post?.subComments?.length);
  return (
    <section key={comment?.id} className='flex flex-col'>
      <div className='flex flex-col'>
        <div
          key={comment?.id}
          className=' m-1 p-1 relative rounded group md:hover:shadow-md'
          style={{
            marginLeft: `${mright * 10}px`,
            paddingRight: `${mleft * 30}px`,
          }}>
          <div className='flex   flex-col '>
            <div className='flex gap-1 justify-start items-center'>
              <Avatar
                size='xs'
                src={useFindUser(comment?.sender[1])?.imageUrl}
              />
              <div className='flex flex-col '>
                {' '}
                <h3 className='font-roboto text-[11px]'>{comment?.userName}</h3>
                <span className='text-[10px] text-gray-600 italic font-light'>
                  {' ' + timeAgo}
                </span>
              </div>
            </div>
            <div className='p-2 bg-gray-100 text-[12px] md:text-lg'>
              <p className='text-gray-700'>{comment?.text}</p>
            </div>
          </div>

          <div className='absolute bottom-0 right-0 flex gap-8 bg-gray-100 p-1 rounded-br-md'>
            {/* {post?.subComments?.length > 0 && <button>
              <MdExpandLess />
            </button>
            <button>
              <MdExpandMore />
            </button>} */}
            {comment?.isParent && (
              <button
                onClick={() => setOpenReply(true)}
                className='md:hover:scale-110 md:hover:bg-blue-gray-100 p-1 rounded-md md:hover:drop-shadow-md relative'>
                reply
                {post?.subComments?.length > 0 && (
                  <span className='text-[11px] text-white absolute rounded-full bg-red-400 w-4 h-4 justify-center items-center '>
                    {post?.subComments?.length}
                  </span>
                )}
              </button>
            )}
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
          {openReply && (
            <Comments
              data={comment}
              setOpenComment={setOpenReply}
              types='reply'
              post={post}
            />
          )}
        </div>
      </div>
      {post?.subComments?.length > 0 &&
        post?.subComments
          .filter((sub: any) => {
            return sub?.parentID === post?.comments[index]?.id;
          })
          .map((reply: any) => {
            return (
              <Reply
                key={reply?.id}
                comment={reply}
                mright={mright + 3}
                mleft={mleft - 1}
                done={true}
                post={post}
              />
            );
          })}
    </section>
  );
};

export default Reply;

const Replies = ({ post, index, mright, mleft }: any) => {
  console.log('this is post'.toUpperCase(), post, index);
  return (
    <div>
      {post?.subComments

        .filter((sub: any) => {
          return sub?.parentID === post?.comments[index]?.id;
        })
        .map((reply: any) => {
          return (
            <Reply
              key={reply?.id}
              comment={reply}
              mright={mright + 3}
              mleft={mleft - 1}
              done={true}
              post={post}
            />
          );
        })}
    </div>
  );
};
