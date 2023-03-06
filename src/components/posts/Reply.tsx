import React, { FC, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import useAuth from '@/firebase/usefirebaseUI';
import {
  Accordion,
  AccordionBody,
  Avatar,
  Tooltip,
} from '@material-tailwind/react';
import useFindUser from '../../hooks/useFindUser';
import { useTimeAgo } from '../../hooks/useDate';
import Comments from './Comments';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Fragment } from 'react';
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
  const [open, setOpen] = useState<number>(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  //const postOwner = useFindUser(comment?.uid)?.
  console.log(
    'comments are ',
    post?.comments,
    'subcomments are ',
    post?.subComments,
  );
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

          <div className='absolute bottom-0 right-0 flex gap-8 p-1 rounded-br-md'>
            {comment?.isParent && post?.subComments?.length > 0 && (
              <>
                {open === 1 ? (
                  <Tooltip content='Collapse'>
                    <button onClick={() => handleOpen(0)}>
                      <MdExpandLess />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip content='Expand'>
                    <button onClick={() => handleOpen(1)}>
                      <MdExpandMore />
                    </button>
                  </Tooltip>
                )}
              </>
            )}

            <button
              onClick={() => setOpenReply(!openReply)}
              className='md:hover:scale-110 md:hover:bg-blue-gray-100 p-1 rounded-md md:hover:drop-shadow-md relative justify-center flex items-center '>
              {comment?.isParent &&
              !openReply &&
              post?.subComments.filter(
                (subComment: any) => subComment.parentID === comment?.id,
              )
                ? post?.subComments?.length > 1
                  ? 'replies'
                  : 'reply'
                : ''}

              <span className='text-[11px] text-white absolute rounded-full bg-red-400  justify-center items-center flex -right-2 -top-1 w-4 aspect-auto'>
                {comment?.isParent &&
                  post?.subComments?.length > 0 &&
                  post?.subComments.filter(
                    (subComment: any) => subComment.parentID === comment?.id,
                  ).length}
              </span>
            </button>

            {/* <button>
              <AiOutlineLike />
            </button> */}
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
      <Fragment>
        <Accordion open={open === 1}>
          <AccordionBody>
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
          </AccordionBody>
        </Accordion>
      </Fragment>
    </section>
  );
};
export default Reply;
