import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { ICard } from '../types';

const Card = ({ feature: { title, description, link }, data }: ICard) => {
  return (
    <div className='bg-white rounded-lg p-6'>
      <div className='flex items-center mb-4'>
        <img src={data} alt={title} className='h-64  mr-4' />
        <h3 className='text-lg font-medium '>{title}</h3>
      </div>
      <p className='text-gray-700'>{description}</p>
      <article className='prose lg:prose-xl'>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{link}</p>
      </article>
    </div>
  );
};

export default Card;
