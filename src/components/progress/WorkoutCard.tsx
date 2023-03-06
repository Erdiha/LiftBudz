import { useState } from 'react';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';
import Image from 'next/image';
import { Select, Option } from '@material-tailwind/react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

interface IMuscleCards {
  title: string;
  icon: any;
  subItems?: string[];
  sets: number;
  setSets: any;
  incrementRef: any;
  setSelectedItem: any;
  selectedItem: any;
  reps: number;
  setReps: any;
  isReps: boolean;
  setIsReps: any;
  muscleGroup: any;
  muscle: any;
}

const WorkoutCard: React.FC<IMuscleCards> = ({
  title,
  icon,
  subItems,
  incrementRef,
  setSelectedItem,
  selectedItem,
  reps,
  setReps,
  sets,
  setSets,
  isReps,
  setIsReps,
  muscleGroup,
  muscle,
}: any) => {
  const [currentClick, setCurrentClick] = useState(1);
  const increaseCount = () => {
    isReps
      ? setReps((prevCount: any) => prevCount + incrementRef.current)
      : setSets((prevCount: any) => prevCount + incrementRef.current);
  };

  const decreaseCount = () => {
    isReps
      ? setReps((prevCount: any) => prevCount - incrementRef.current)
      : setSets((prevCount: any) => prevCount - incrementRef.current);
  };

  const handleClear = () => {
    setSelectedItem(null);
    incrementRef.current = 1;
    setReps(0);
    setSets(0);
    setCurrentClick(1);
    setIsReps(true);
  };
  console.log();
  return (
    <Card className='relative text-center flex flex-col md:w-[50%] justify-between bg-gray-100 rounded-b-none w-full '>
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
          {subItems?.map((item: any, index: number) => {
            return (
              <Option value={item} key={index}>
                {item}
              </Option>
            );
          })}
        </Select>
        <div className='w-full grid grid-flow-col  gap-2 p-1 font-semibold'>
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
          <div className='flex justify-around w-full flex-col'>
            <div className='flex w-full justify-around gap-2 p-1 '>
              <Button
                variant={`${isReps ? 'gradient' : 'outlined'}`}
                onClick={() => setIsReps(() => true)}
                className={`p-2  w-full shadow `}>
                Reps
              </Button>
              <Button
                variant={`${!isReps ? 'gradient' : 'outlined'}`}
                onClick={() => setIsReps(() => false)}
                className={`p-2 ${!isReps ? '' : ''} w-full shadow `}>
                Sets
              </Button>
            </div>
            <div className='flex justify-around w-full gap-2 p-1 '>
              <Button
                variant={`${currentClick === 1 ? 'gradient' : 'outlined'}`}
                className={`p-2 w-full bg-transparent`}
                onClick={() => {
                  setCurrentClick(1);
                  incrementRef.current = 1;
                }}>
                1
              </Button>
              <Button
                variant={`${currentClick === 5 ? 'gradient' : 'outlined'}`}
                className='p-2 w-full bg-transparent'
                onClick={() => {
                  setCurrentClick(5);
                  incrementRef.current = 5;
                }}>
                5
              </Button>
              <Button
                variant={`${currentClick === 10 ? 'gradient' : 'outlined'}`}
                className='p-2 w-full bg-transparent'
                onClick={() => {
                  setCurrentClick(10);
                  incrementRef.current = 10;
                }}>
                10
              </Button>
            </div>
          </div>
        </div>
        <div className='grid grid-flow-col'>
          <Button
            disabled={reps < incrementRef.current}
            className='p-1 rounded-none hover:bg-gray-200  bg-white/50 text-blue-600 flex justify-center '
            onClick={decreaseCount}>
            <HiOutlineMinusSm size='2em' className='md:text-xl ' />
          </Button>
          <span className='text-2xl px-4 font-serif font-semibold  flex border items-center justify-center'>
            {isReps ? reps : sets}
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

export default WorkoutCard;
