import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { ICard } from '../types';
import { Card, CardHeader, CardBody } from '@material-tailwind/react';

const SegmentCard = ({
  feature: { title, description, link },
  data,
}: ICard) => {
  return (
    <div className='bg-black/30 rounded-lg md:p-6 p-1 w-full flex flex-row '>
      <section className='flex items-center relative '>
        <img src={data} alt={title} className='' />
        <h3 className='top-8 left-8 md:text-4xl text-xl text-gray-50  font-black tracking-widest font-body  absolute uppercase '>
          {title}
        </h3>
        <p className='absolute md:-right-16 -bottom-16 md:text-3xl  font-extrabold bg-white/40 backdrop-blur-sm text-black/70 rounded pl-8 invert tracking-wider  h-[40%] text-end flex justify-center items-center backdrop-filter pr-1 break-words'>
          {description}
        </p>
      </section>
    </div>
  );
};

export default SegmentCard;
