import { useRef, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { TrashIcon, ShareIcon } from '@heroicons/react/24/outline';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import Modal from './Modal';

function Exercise({ workout }: any) {
  console.log('workout', workout);
  const [completed, setCompleted] = useState(0);
  const calculatePercentage = useRef(0.0);

  const deleteWorkout = async (id: string) => {
    try {
      await db.collection('workout').doc(id).delete();
      toast.success(id + ' Workout deleted successfully!');
    } catch (error) {
      toast.error('Error deleting workout!');
    }
  };
  const percentage = 66;
  return (
    <Card className='my-4 mx-2 md:mx-0 bg-blue-gray-50/60  md:mt-10 md:p-4 shadow-xl px-2 h-fit relative'>
      <CircularProgressbar
        value={calculatePercentage.current}
        text={`${calculatePercentage.current}`}
        className=' md:h-40 md:w-40 shadow-md py-4 h-20 w-20'
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: 'butt',
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
      <CardBody className='p-3 md:p-6 ring-1 ring-gray-300  relative overflow-y-auto md:mb-20 md:h-96 mb-28'>
        {workout?.exercises.map((w: any) => {
          calculatePercentage.current = (w.reps * w.sets) / 100;
          return (
            <section
              key={w.id}
              className='p-1 flex flex-col my-4 border-b-[1px] border-gray-300'>
              <Typography
                variant='h5'
                className='mb-1 font-serif text-sm md:text-md  text-gray-500'>
                Muscle Group:{' '}
                <span className='text-gray-600 uppercase tracking-wider'>
                  {w.muscleGroup}
                </span>
              </Typography>
              <Typography
                variant='h6'
                className='font-serif text-sm md:text-md  '>
                <p className='font-sans text-gray-500'>
                  Target Muscle:{' '}
                  <span className='text-gray-600 uppercase tracking-wider font-serif text-sm md:text-md '>
                    {' '}
                    {w.muscle}
                  </span>
                </p>
                <p className='uppercase w-fit  flex gap-4'>
                  {' '}
                  <span className='bg-blue-gray-50 p-2 rounded-lg'>
                    {' '}
                    Sets:{' '}
                    <span className='font-serif text-xl'>{w.sets.length}</span>
                  </span>
                  <span className='bg-blue-gray-50 p-2 rounded-lg'>
                    {' '}
                    Reps:{' '}
                    <span className='font-serif text-xl'>{w.reps.reps}</span>
                  </span>
                </p>
              </Typography>
            </section>
          );
        })}
      </CardBody>
      <CardFooter
        divider
        className='flex right-0 left-0 justify-around  items-center md:justify-between h-20 absolute bottom-1 rounded-none rounded-b-none   '>
        <Button
          className='flex text-gray-800 justify-between items-center gap-2 p-3 bg-blue-gray-100'
          onClick={() => deleteWorkout(workout.id)}>
          <TrashIcon strokeWidth={2} className='h-5 w-5' />
          delete
        </Button>
        <Button className='start-button rounded-full py-0 px-0 w-20 aspect-square justify-center flex items-center  text-gray-200 '>
          <Modal workout={workout} />
        </Button>
        <Button className='flex text-gray-800 justify-between items-center gap-2 p-3 bg-blue-gray-100'>
          <ShareIcon strokeWidth={2} className='h-5 w-5' />
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Exercise;
