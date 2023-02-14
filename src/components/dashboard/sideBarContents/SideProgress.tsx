import { Button, Tooltip } from '@material-tailwind/react';
import Avatar from 'avataaars';
import React from 'react';

function SideProgress({ activeTab, setActiveTab }: any) {
  return (
    <div className='flex flex-col md:h-full bg-gray-200 bottom-0 w-full  p-8 gap-2 top-16 md:top-0 md:relative absolute'>
      <Button
        className='w-16 flex justify-center'
        onClick={() => setActiveTab('posts')}>
        BACK
      </Button>
      <div className='flex-flex-col bg-white w-full h-full rounded-lg p-4  relative overflow-y-auto scroll-y-auto'>
        <div className='grid grid-flow-row gap-3 justify-center  rounded '>
          <Tooltip content='Delete Conversation'>
            <button className='absolute -bottom-2 -right-2 rounded-full p-2 hidden group-hover:block    bg-red-400'></button>
          </Tooltip>
          <Avatar
            style={{
              width: '80px',
              height: '80px',
            }}
            avatarStyle='Circle'
          />
          <div className='pl-2'>
            <div className='font-semibold'>
              <button></button>
            </div>
            <div className='text-xs text-gray-600'>Online</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideProgress;
