import { Button } from '@material-tailwind/react';
import React from 'react';
import AnatomyCard from './AnatomyCard';
import Link from 'next/link';

interface ProgressProps {
  activeTab: string | null;
  openSideBar: boolean;
  setActiveTab: (activeTab: string) => void;
  setOpenSideBar: (openSideBar: boolean) => void;
}

function Progress({
  activeTab,
  setActiveTab,
  setOpenSideBar,
  openSideBar,
}: ProgressProps) {
  const workoutPlans = [];

  return (
    <div className='mt-[5rem] w-full h-full md:px-8 md:py-4 flex flex-col justify-center items-center'>
      <div className='flex w-full md:py-4 justify-between tracking-widest p-2'>
        <Button
          onClick={() => {
            setOpenSideBar(!openSideBar);
          }}
          className='justify-start tracking-wider'
          variant='gradient'>
          MENU
        </Button>
        <Button
          onClick={() => setOpenSideBar(!openSideBar)}
          className='justify-start tracking-wider'
          variant='gradient'>
          Create Plan
        </Button>
      </div>

      <AnatomyCard />
    </div>
  );
}

export default Progress;
