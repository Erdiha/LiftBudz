import React from 'react';
import SegmentCard from './SegmentCards';
import { IPexelImages } from '@/pages/types';
import { titleANDdescFeatures } from '@/utils/texts';
import { Button, Typography } from '@material-tailwind/react';
import { type } from 'os';
import router from 'next/router';

function MainpageSegments() {
  const imageLinks = ['/dumbell.jpg', '/friends.jpg', '/girl.jpg'];
  return (
    <section className=' py-8 w-full mb-16'>
      <div className='mx-auto max-w-screen-xl px-4'>
        <h2 className='text-5xl font-medium text-center mb-6 capitalize tracking-wide p-10 '>
          Discover the Power of Our Features
        </h2>
        <div className='flex flex-col gap-40'>
          {titleANDdescFeatures.map((feature, index) => (
            <SegmentCard
              key={index}
              feature={feature}
              data={imageLinks[index]}
            />
          ))}
        </div>
      </div>
      <div className=' w-full h-[10vh] mt-32 '>
        <Typography
          variant='h4'
          className='h-full w-full break-words text-center flex justify-center items-center'>
          <Button
            onClick={() => router.push('/signin')}
            variant='gradient'
            className=' md:text-3xl tracking-wide text-gray-200'>
            Sign Up Today!
          </Button>
        </Typography>
      </div>
    </section>
  );
}

export default MainpageSegments;
