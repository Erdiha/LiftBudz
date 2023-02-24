import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { useDelete } from '@/hooks/useDelete';
import { useGetAvatar } from '@/hooks/useFetch';
import { capitalFirstLetter } from '@/utils/textModify';
import { Tooltip } from '@material-tailwind/react';
import React, { useState, useEffect, useRef } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { useTimeAgo } from '@/hooks/useDate';
import Image from 'next/image';

function Message({ message, curUserEMAIL, sender, dLoading }: any) {
  const { deleteItem, dError } = useDelete();
  const { getCurrentUser } = useUserLibrary(useAuth().currentUser?.uid);
  const [open, setOpen] = useState(false);
  const timeAgo = useTimeAgo(message?.timestamp);

  const handleDelete = (ID: string) => {
    deleteItem(ID, 'messages');
    if (dLoading) {
      toast('Loading!');
    } else if (dError) {
      toast('Error deleting message!');
    } else {
      toast('Message deleted successfully!');
    }
  };

  return (
    <div
      key={message?.id}
      className={`flex flex-col p-0  relative group mb-2 ${
        message.conversationId[0] === curUserEMAIL ? 'self-end' : 'self-start'
      }`}>
      {dLoading ? (
        <Loading />
      ) : (
        <>
          {' '}
          <Tooltip content='Delete Message'>
            <span
              onClick={() => handleDelete(message?.id)}
              className={`md:hover:scale-110 cursor-pointer  absolute rounded-full text-red-400 bg-white  aspect-square text-center ${
                message?.conversationId[0] === curUserEMAIL
                  ? '-top-2 -left-2 hidden group-hover:block'
                  : 'hidden'
              }`}>
              <TiDeleteOutline />
            </span>
          </Tooltip>
          <div className='relative'>
            <span
              className={`flex absolute border-[1px] border-blue-gray-300 bg-blue-gray-50 justify-center rounded-full md:p-4 md:w-8 md:h-8 md:font-bold font-semibold  text-gray-900 items-center ${
                message?.conversationId[0] === curUserEMAIL
                  ? '-right-5 -top-5'
                  : '-left-5 -top-5'
              }`}>
              {sender?.displayName
                ? capitalFirstLetter(sender?.displayName)
                : capitalFirstLetter(getCurrentUser?.displayName)}
            </span>
          </div>
          <div
            className={`message md:p-4 p-1 rounded border-2  border-blue-gray-600 ${
              message?.conversationId[0] === curUserEMAIL
                ? 'bg-blue-gray-50 text-black'
                : 'bg-blue-gray-[30] text-black'
            }`}>
            {message?.image && (
              <>
                <Image
                  alt=''
                  src={message?.image}
                  className='flex w-full cursor-pointer '
                  onClick={() => setOpen(true)}
                  // Calculate the width and height based on the aspect ratio of the image
                  width={150}
                  height={(9 / 16) * 100}
                />

                {open && (
                  <ImageModal
                    open={open}
                    setOpen={setOpen}
                    message={message}
                    dLoading={dLoading}
                  />
                )}
              </>
            )}

            {message?.text && (
              <p className='text-sm flex justify-center h-full w-full'>
                {message?.text}
              </p>
            )}
          </div>
          <div
            className={`flex text-xs italic font-extralight ${
              message?.conversationId[0] === curUserEMAIL
                ? 'justify-end pr-2'
                : 'justify-start pl-2'
            }`}>
            {timeAgo}
          </div>
        </>
      )}
    </div>
  );
}

export default Message;

import { Fragment } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import Loading from '@/utils/Loading';

export function ImageModal({ open, setOpen, message, isLoading }: any) {
  const handleOpen = () => setOpen(!open);

  return (
    <div className='flex items-center justify-center h-full'>
      <Dialog
        open={open}
        handler={handleOpen}
        className=' relative bg-white/80 m-4  backdrop-blur-md rounded-lg shadow-2xl text-blue-gray-500 antialiased font-sans text-base font-light leading-relaxed   text-center  p-8'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Image
              alt=''
              src={message?.image}
              className='flex w-full cursor-pointer '
              onClick={() => setOpen(true)}
              // Calculate the width and height based on the aspect ratio of the image
              width={250}
              height={(9 / 16) * 250}
            />
            <Button
              variant='text'
              color='red'
              onClick={handleOpen}
              className='mr-1 bg-gray-200 mt-2'>
              <span>CLOSE</span>
            </Button>
          </>
        )}
      </Dialog>
    </div>
  );
}
