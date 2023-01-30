import useAuth from '@/firebase/usefirebaseUI';
import { Button, Input } from '@material-tailwind/react';
import { useEffect, useRef } from 'react';

export function MessageCard({ messages, setFormValue, sendMessage }: any) {
  const { currentUser } = useAuth();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className=" flex  w-full h-full p-4 	bg-gray-200">
      <div className="  flex flex-col border shadow-md overflow-y-auto w-full backdrop-blur-lg bg-white/50">
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center">
            <img
              className="rounded-full w-10 h-10"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="pl-2">
              <div className="font-semibold">
                <a className="hover:underline" href="#">
                  John Doe
                </a>
              </div>
              <div className="text-xs text-gray-600">Online</div>
            </div>
          </div>

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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={messageContainerRef}
          className=" flex flex-col w-full px-4 py-4 overflow-y-auto duration-200 transform ease-in-out "
        >
          {messages?.map((message: any) => {
            if (currentUser?.uid === message?.uid) {
              return (
                <div key={message?.id} className="flex items-center mb-4">
                  <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                    <img
                      className="rounded-full max-w-10 max-h-10"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
              return (
                <div
                  key={message?.id}
                  className="flex items-center flex-row-reverse mb-4"
                >
                  <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                    <img
                      className="rounded-full w-10 h-10"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                    <a href="#" className="block text-xs hover:underline">
                      Jesse
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

        <div className="flex items-center border-t p-2">
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

          <form onSubmit={sendMessage} className="w-full mx-2 p-4 flex  gap-4">
            <Input
              onChange={(e) => setFormValue(e.target.value)}
              className="w-full rounded-full border border-gray-200 h-10 p-4"
              label="Message"
              autoFocus
            />

            <Button type="submit">send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
