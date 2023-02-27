import { useRef, useState } from 'react';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';
import Image, { ImageProps } from 'next/image';
import { Select, Option } from '@material-tailwind/react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  CardProps,
  CardHeaderProps,
  CardBodyProps,
} from '@material-tailwind/react';

interface IMuscleCards {
  title: string;
  icon: any;
  subItems?: string[];
}

const CardItem: React.FC<IMuscleCards> = ({ title, icon, subItems }) => {
  const [count, setCount] = useState(0);
  const amountRef = useRef(1);
  const [selectedItem, setSelectedItem]: any = useState(null);

  const increaseCount = () => {
    setCount((prevCount) => prevCount + amountRef.current);
  };

  const decreaseCount = () => {
    setCount((prevCount) => prevCount - amountRef.current);
  };

  const handleClear = () => {
    setSelectedItem(null);
    amountRef.current = 1;
    setCount(0);
  };
  console.log(selectedItem);
  return (
    <Card className='relative text-center  flex flex-col md:w-[50%]  justify-between bg-gray-100 rounded-b-none '>
      <CardHeader
        variant='filled'
        color='white'
        className='flex rounded justify-center items-center bg-black/10 text-center py-2 mb-4'>
        <Typography variant='h6' className=' text-gray-700 uppercase'>
          {title}
        </Typography>
        <Image
          className='absolute right-0 p-2 my-2 rounded-r border-l-black border-2 shadow-lg bg-blue-gray-50 aspect-square'
          width={50}
          height={50}
          src={icon}
          alt={`${icon + 'image'}`}
        />
      </CardHeader>
      <CardBody className='flex flex-col items-center w-full  gap-2 justify-around p-1 pt-2 '>
        <Select
          onBlur={() => {}}
          value={selectedItem}
          onChange={(e: any) => setSelectedItem(e)}
          label='Select Muscle'
          className='flex p-0 m-0 '>
          {subItems?.map((item, index) => {
            return (
              <Option value={item} key={index}>
                {item}
              </Option>
            );
          })}
        </Select>
        <div className='w-full grid grid-flow-col  gap-2 p-1 font-semibold'>
          {' '}
          <button className='shadow rounded p-1 bg-blue-gray-100  md:hover:bg-gray-500 md:hover:text-white col-span-1'>
            ADD
          </button>
          <button
            className='shadow rounded p-1 bg-blue-gray-100  md:hover:bg-gray-500 md:hover:text-white col-span-1'
            onClick={handleClear}>
            CLEAR
          </button>
        </div>
      </CardBody>
      <CardFooter className=' w-full rounded-none  flex flex-col  gap-2 p-1'>
        <div className='flex flex-col w-full justify-center items-center p-1 gap-2'>
          {' '}
          <span
            className='text-[12px] text-black font-semibold p-1
          '>
            Increment Amount (default is 1)
          </span>{' '}
          <div className='flex justify-around w-40  '>
            <Button
              className='py-2 px-4'
              onClick={() => (amountRef.current = 1)}>
              1
            </Button>
            <Button
              className='py-2 px-4'
              onClick={() => (amountRef.current = 5)}>
              5
            </Button>
            <Button
              className='py-2 px-4'
              onClick={() => (amountRef.current = 10)}>
              10
            </Button>
          </div>
        </div>
        <div className='grid grid-flow-col'>
          <Button
            disabled={count < amountRef.current}
            className='p-1 rounded-none hover:bg-gray-200  bg-white/50 text-blue-600 flex justify-center '
            onClick={decreaseCount}>
            <HiOutlineMinusSm size='2em' className='md:text-xl ' />
          </Button>
          <span className='text-2xl px-4 font-serif font-semibold  flex border items-center justify-center'>
            {count}
          </span>
          <Button
            className='p-1 rounded-none  hover:bg-gray-200  bg-white/50 text-blue-600 flex justify-center '
            onClick={increaseCount}>
            <HiOutlinePlusSm size='2em' className='md:text-xl ' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
