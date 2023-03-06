import { db } from '../../../firebase/firebase';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { Avatar, Button } from '@material-tailwind/react';
import { useGetUsers } from '../../data';
import Loading from '@/utils/Loading';
import { useDelete } from '@/hooks/useDelete';
import { AiFillDelete } from 'react-icons/ai';
import { Tooltip } from '@material-tailwind/react';
import { useEffect, useRef } from 'react';
import { fetchChats } from '../../../redux/chatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchUsers } from '../../../redux/usersSlice';
import { isUserOnline } from '../../../utils/helperFuntions';

function SideChats({
  setActiveTab,
  setSendMessageToUser,
  messageUserId,
  setMessageUserId,
}: any) {
  const { currentUser } = useAuth();
  const curUserEMAIL: any = currentUser?.email;
  //redux calls
  const dispatch: any = useDispatch();
  const allChats = useSelector((state: RootState) => state.chats.chats);
  const { deleteForMe, dLoading, dError } = useDelete();
  const { getCurrentUser } = useUserLibrary(useAuth().currentUser?.uid);
  const { users, loading, error } = useGetUsers(curUserEMAIL, 'friends');
  const onlineRef: any = useRef(false);

  useEffect(() => {
    dispatch(fetchChats());
    dispatch(fetchUsers());
  }, [dispatch]);

  function findNewestMessage(user: any) {
    const userChats = allChats?.filter((chat: any) =>
      chat?.conversationId.includes(user?.email),
    );

    if (userChats.length === 0) {
      return null;
    }

    userChats.sort((a: any, b: any) => b.timestamp - a.timestamp);
    onlineRef.current = isUserOnline(userChats[0].timestamp);
    return userChats[0].text.substring(0, 15) + '...';
  }

  const handleUserMessageClicked = async (user: any) => {
    if (!user) {
      return;
    } else {
      allChats?.filter(async (m: any) => {
        // <-- add "async" here
        if (user.email === m.conversationId[0]) {
          const messageRef = db.collection('messages').doc(m.id);
          try {
            await messageRef.update({
              receiverHasRead: true,
            });
          } catch (error) {
            // Handle the error here, e.g. by logging it or displaying a message to the user
            console.log('Error updating message:', error);
          }
        }
      });
      setSendMessageToUser(true);
      setMessageUserId(user?.email);
    }
  };

  return (
    <div className='flex  md:w-[20rem] shadow-md backdrop-blur-lg    flex-col bg-white/10 rounded p-2 mt-20'>
      <Button
        className='w-full flex justify-center'
        onClick={() => setActiveTab('posts')}>
        BACK
      </Button>
      <div className='flex flex-col w-full h-full rounded-lg   relative overflow-y-auto scroll-y-auto p-6'>
        <div className='grid grid-flow-row gap-4 justify-center items-center mx-auto rounded'>
          {loading ? (
            <Loading />
          ) : (
            users?.map(
              (user: any) =>
                allChats?.find(
                  (m: any) =>
                    m.conversationId.includes(user.email) &&
                    !m.senderDeleted &&
                    m.conversationId.includes(currentUser?.email),
                ) && (
                  <div
                    key={user?.id}
                    onMouseDown={() => handleUserMessageClicked(user)}
                    className={`flex w-full cursor-pointer rounded shadow-md backdrop-blur-sm items-center group  ${
                      messageUserId === user.email
                        ? 'bg-blue-200 scale-105 text-white'
                        : 'bg-blue-gray-50 scale-100  text-gray-900 '
                    } transition-all duration-400 ease-in-out `}>
                    {allChats?.find(
                      (m: any) =>
                        m.conversationId[1] === curUserEMAIL &&
                        m.conversationId[0] === user.email &&
                        !m.receiverHasRead &&
                        messageUserId !== user.email,
                    ) && (
                      <span className='w-3  animate-bounce aspect-square text-center rounded-full bg-red-500 text-white absolute -top-1 -right-1'></span>
                    )}
                    <Tooltip content='Delete Conversation'>
                      <button
                        onClick={() =>
                          deleteForMe(
                            'messages',
                            messageUserId,
                            getCurrentUser?.email,
                          )
                        }
                        className='absolute -bottom-2 -right-2 rounded-full p-2 hidden group-hover:block    bg-red-400'>
                        <AiFillDelete className=' text-white' />
                      </button>
                    </Tooltip>
                    <span
                      className={` ring-[2px] p-2 rounded-lg bg-white/50 
                         'ring-gray-200'
                      `}>
                      <Avatar
                        src={user?.imageUrl ? user?.imageUrl : 'No Image'}
                      />
                    </span>
                    <div className='pl-2 w-full px-2'>
                      <div className='font-semibold'>
                        <p className=' flex  text-start '>
                          {user?.displayName.toUpperCase()}
                        </p>
                      </div>
                      <div className='text-xs text-gray-600'>
                        {findNewestMessage(user)}
                      </div>
                    </div>
                  </div>
                ),
            )
          )}
        </div>
      </div>
      <Button
        onClick={() => {
          setSendMessageToUser(true), setMessageUserId('');
        }}>
        New Chat
      </Button>
    </div>
  );
}

export default SideChats;
