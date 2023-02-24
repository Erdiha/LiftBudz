import {
  Input,
  Tooltip,
  Button,
  Avatar,
  button,
} from '@material-tailwind/react';
import React, { useRef, useState, useEffect } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { capitalFirstLetter } from '@/utils/textModify';
type Props = {
  allMessages: any[];
  users: any[];
  curUserEMAIL: string | null | undefined;
  messagesEndRef: any;
  handleSubmit: (event: any) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  messageUserId: any;
  setSendMessageToUser: (value: any) => void;
  setFile: (value: any) => void;
  isLoadingChat: boolean;
  file: any;
};

import { useDelete } from '@/hooks/useDelete';
import { useGetAvatar } from '@/hooks/useFetch';
import { useUserLibrary } from '../../firebase/usefirebaseUI';
import useAuth from '../../firebase/usefirebaseUI';
import Message from './Message';
import { IoAddOutline } from 'react-icons/io5';
import Loading from '@/utils/Loading';

const Messages = ({
  allMessages,
  users,
  curUserEMAIL,
  messagesEndRef,
  handleSubmit,
  inputValue,
  setInputValue,
  messageUserId,
  setSendMessageToUser,
  setFile,
  isLoadingChat,
  file,
}: Props) => {
  const getAvatar = useGetAvatar();
  const { getCurrentUser } = useUserLibrary(useAuth().currentUser?.uid);
  const { deleteItem, dLoading, dError } = useDelete();
  const [timeAgo, setTimeAgo] = useState<string>('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dateREF = useRef<any>();

  useEffect(() => {
    setTimeAgo(dateREF.current);
  }, [allMessages]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const attachFileContent = selectedFile
    ? `Attach file: ${selectedFile.name}`
    : 'Attach file';

  return (
    <div className='flex  flex-col h-full w-full md:max-w-7xl shadow-xl rounded-lg overflow-hidden backdrop-blur-lg	p-4'>
      <div className='flex  w-full  gap-2 items-center border-b-[1px] bg-blue-gray-100  justify-between p-4'>
        {' '}
        <div className='flex justify-between items-center'>
          {' '}
          <Avatar
            src={
              getCurrentUser?.imageUrl
                ? getCurrentUser?.imageUrl
                : capitalFirstLetter(getCurrentUser?.displayName)
            }
          />
          <span className='font-semibold drop-shadow-lg p-2 '>
            {getCurrentUser?.displayName.toUpperCase()}
          </span>
        </div>
        <Button
          onClick={() => setSendMessageToUser((prev: any) => !prev)}
          className='flex'>
          BACK
        </Button>
      </div>
      <div className='flex flex-col w-full overflow-auto h-full p-6 px-7 font-sans bg-white'>
        {allMessages?.map((message: any) => {
          const sender = users.find(
            (user: any) => user.email === message.conversationId[0],
          );
          dateREF.current = message?.timestamp;
          return (
            message?.conversationId.includes(curUserEMAIL) &&
            !message?.senderDeleted &&
            message?.conversationId.includes(messageUserId) && (
              <Message
                message={message}
                curUserEMAIL={curUserEMAIL}
                sender={sender}
                timeAgo={timeAgo}
                dLoading={dLoading}
              />
            )
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className='flex w-full justify-between items-center h-16 gap-4 border-t-[1px]'>
        <Input
          type='text'
          label='Type your message here...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          disabled={isLoadingChat}
          className='w-full'
        />
        <div className='flex items-center gap-4  justify-around'>
          <Tooltip color='blue' content={attachFileContent}>
            <label htmlFor='file-upload' className='cursor-pointer'>
              <IoAddOutline className='md:h-6 md:w-6 w-5 h-5 ' />
            </label>
          </Tooltip>
          {/* <Tooltip color='blue' content='Delete attachment'>
            <button
              disabled={!selectedFile}
              onClick={() => setSelectedFile(null)}
              className='disabled:opacity-50 cursor-pointer focus:outline-none'>
              <TiDeleteOutline className='h-6 w-6' />
            </button>
          </Tooltip> */}
          <input
            id='file-upload'
            type='file'
            onChange={handleFileSelect}
            className='hidden'
          />
          <Button onClick={handleSubmit} color='blue'>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
