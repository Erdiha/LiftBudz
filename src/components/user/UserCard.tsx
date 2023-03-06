import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Avatar,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import { IUser } from '../../firebase/types';

export default function UserCard({
  imageUrl,
  description,
  displayName,
  email,
  mobile,
  location,
  id,
}: IUser) {
  return (
    <Card
      key={id}
      className='flex max-h-64 w-full bg-white/60 backdrop-blur-md'>
      <CardHeader
        floated={false}
        className='bg-black/10 text-gray-600 mt-0 mx-0 p-2 rounded-none overflow-hidden   shadow-lg  justify-start items-center flex gap-2'>
        <Avatar src={`${imageUrl ? imageUrl : 'No Image'}`} />
        <Typography variant='h4' className=' '>
          {displayName}
        </Typography>
      </CardHeader>
      <Typography
        className='font-medium border-b-2 px-2 p-2 italic text-gray-700'
        textGradient>
        {description}
      </Typography>
      <CardFooter className='flex flex-col  gap-1  justify-start text-sm '>
        <Typography color='blue' textGradient className='flex text-sm w-full'>
          <span className='text-gray-600 pr-2'>EMAIL: </span>
          {email ? email : 'N/A'}
        </Typography>
        <Typography color='light-blue' textGradient className='text-sm w-full'>
          <span className='text-gray-600 pr-2'>MOBILE: </span>
          {mobile ? mobile : 'N/A'}
        </Typography>
        <Typography color='light-blue' textGradient className='text-sm '>
          <span className='text-gray-600 pr-2'>LOCATION: </span>
          {location ? location : 'N/A'}
        </Typography>
      </CardFooter>
    </Card>
  );
}
