import { db } from '../../../firebase/firebase';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import Avatar from 'avataaars';
import { Button, Card } from '@material-tailwind/react';
import { useGetMessages } from '@/components/data';
import { useGetUsers } from '../../data';
import Loading from '@/utils/Loading';
import { useDelete } from '@/hooks/useDelete';
import { AiFillDelete } from 'react-icons/ai';
import { Tooltip } from '@material-tailwind/react';
import { useEffect } from 'react';
import { fetchChats } from '../../../redux/chatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
function SideChats({
  setActiveTab,
  activeTab,
  sendMessageToUser,
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

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const { users, loading, error } = useGetUsers(curUserEMAIL, 'friends');

  const handleUserMessageClicked = async (user: any) => {
    if (!user) {
      return;
    } else {
      allChats?.filter((m: any) => {
        if (user.email === m.conversationId[0]) {
          const messageRef = db.collection('messages').doc(m.id);
          messageRef.update({
            receiverHasRead: true,
          });
        }
      });
      setSendMessageToUser(true);
      setMessageUserId(user?.email);
    }
  };
  console.log('allChats', allChats);
  return (
    <div className='flex flex-col md:h-full bg-gray-200 bottom-0 w-full  p-8 gap-2 top-16 md:top-0 md:relative absolute mt-10'>
      <Button
        className='w-16 flex justify-center'
        onClick={() => setActiveTab('posts')}>
        BACK
      </Button>
      <div className='flex-flex-col bg-white w-full h-full rounded-lg p-4  relative overflow-y-auto scroll-y-auto'>
        <div className='grid grid-flow-row gap-3 justify-center  rounded w-full '>
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
                  <Card
                    color='teal'
                    key={user?.id}
                    className={`flex rounded shadow-md backdrop-blur-sm items-center p-3 group  ${
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
                    <Avatar
                      style={{
                        width: '80px',
                        height: '80px',
                      }}
                      {...user.photoURL}
                      avatarStyle='Circle'
                      className='hidden group-hover:block '
                    />
                    <div className='pl-2 w-full px-2'>
                      <div className='font-semibold'>
                        <button
                          onClick={() => handleUserMessageClicked(user)}
                          className='hover:underline flex  text-start '>
                          {user?.displayName.toUpperCase()}
                        </button>
                      </div>
                      <div className='text-xs text-gray-600'>Online</div>
                    </div>
                  </Card>
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
