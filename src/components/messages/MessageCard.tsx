import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { Button, Input } from '@material-tailwind/react';
import { useEffect, useRef } from 'react';
import { useGetAvatar } from '../../hooks/useFetch';
import Avatar from 'avataaars';
import { useDispatch, useSelector } from 'react-redux';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getDB } from '@/firebase/fireBase';
import { collection } from 'firebase/firestore';

export function MessageCard({
  messages,
  setFormValue,
  sendMessage,
  setOpenChat,
  openChat,
  sendMessageToUser,
  setSendMessageToUser,
  messageUserId,
  setMessageUserId,
}: any) {
  const { currentUser } = useAuth();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const dispatch: any = useDispatch();
  const { getCurrentUser } = useUserLibrary(useAuth().currentUser?.uid);
  const getAvatar = useGetAvatar();
  const [usersData] = useCollection(collection(getDB, 'users'));
  const users = usersData?.docs.map((user: any) => ({
    id: user.id,
    ...user.data(),
  }));
  console.log('this is users', users);
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages] || []);

  useEffect(() => {
    users?.map((user: any) => {
      messages.map((message: any) => {
        user.userId === message.uid && message.photoURL === user.photoURL;
      });
    });
  }, []);
  console.log('send message to user', sendMessageToUser);
  return sendMessageToUser ? (
    <div className=" flex  md:h-[65vh] h-full relative w-full">
      <div className="  flex flex-col border shadow-md  w-full backdrop-blur-lg bg-gray-100 p-4 h-full">
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center">
            <Avatar
              style={{ width: '80px', height: '80px' }}
              {...getAvatar}
              avatarStyle="Circle"
            />
            <div className="pl-2">
              <div className="font-semibold">
                <a className="hover:underline" href="#">
                  {getCurrentUser?.displayName}
                </a>
              </div>
              <div className="text-xs text-gray-600">Online</div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setOpenChat(false)}
              className="inline-flex hover:bg-indigo-50 rounded-full p-2"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={messageContainerRef}
          className=" flex flex-col px-4  overflow-y-auto scroll-y-auto duration-200 transform ease-in-out mb-12 bg-blue-gray-100"
        >
          {messages?.map((message: any) => {
            if (currentUser?.uid === message?.uid) {
              return (
                <div key={message?.id} className="flex items-center mb-4">
                  <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                    <Avatar
                      style={{ width: '40px', height: '40px' }}
                      {...getAvatar}
                      avatarStyle="Circle"
                    />
                    <a href="#" className="block text-xs hover:underline">
                      John Doe
                    </a>
                  </div>
                  <div className=" bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                    <div>{message?.text}</div>

                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
                  </div>
                </div>
              );
            } else {
              const url = users?.find(
                (user: any) => user?.userId === message?.uid,
              );

              return (
                <div
                  key={message?.id}
                  className="flex items-center flex-row-reverse mb-4"
                >
                  <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                    <Avatar
                      style={{ width: '40px', height: '40px' }}
                      {...url?.photoURL}
                      avatarStyle="Circle"
                    />
                    <a href="#" className="block text-xs hover:underline">
                      {}
                    </a>
                  </div>
                  <div className=" bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
                    <div>{message.text}</div>

                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="flex items-center border-t justify-around  absolute bottom-2 ">
          <div>
            <button
              className="inline-flex hover:bg-indigo-50 rounded-full p-2"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>

          <form
            onSubmit={sendMessage}
            className="w-full grid grid-cols-[70%,25%] gap-2  "
          >
            <Input
              onChange={(e) => setFormValue(e.target.value)}
              className=" rounded-full border border-gray-200 h-10 p-4"
              label="Message"
              autoFocus
            />

            <Button className=" flex  justify-center" type="submit">
              send
            </Button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <p>IT'S LONELY HERE</p>
  );
}

export default MessageCard;
