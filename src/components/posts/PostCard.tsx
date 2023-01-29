import React, { useState } from 'react';
import useAuth from '@/firebase/usefirebaseUI';
import { Button } from '@material-tailwind/react';

const Postcard = ({ id, uid, text, title, photoURL }: any) => {
  const { currentUser } = useAuth();
  const [editable, setEditable] = useState<boolean>(false);
  console.log(text, uid, id);
  return (
    <div className="flex w-full h-full p-4 	bg-gray-200 ">
      <div className=" flex flex-col border shadow-md overflow-y-auto w-full backdrop-blur-lg bg-white/50 p-5">
        <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10 relative">
          <form>
            <div>
              <h3 className="text-2xl font-semibold">{title}</h3>
              <div className="flex items-center mb-4 space-x-2">
                <span className="text-xs text-gray-500">{}</span>
                <span className="text-xs text-gray-500">
                  Created by {uid?.email}
                </span>
              </div>
              <p className="text-base text-gray-700">{text}</p>
            </div>
            <button type="submit"></button>
          </form>
          {currentUser?.uid === uid && (
            <Button
              onClick={() => setEditable((prev: boolean) => !prev)}
              className=" absolute right-2 bottom-2"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Postcard;
