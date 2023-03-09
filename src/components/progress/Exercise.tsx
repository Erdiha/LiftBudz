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
  Tooltip,
} from '@material-tailwind/react';
import { TrashIcon, ShareIcon } from '@heroicons/react/24/outline';

import 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import Modal from './Modal';
import { useEffect } from 'react';

function Exercise({ workout }: any) {
  const [completed, setCompleted] = useState({ complete: 0, incomplete: 0 });
  const calculatePercentage = useRef(0.0);

  const deleteWorkout = async (id: string) => {
    try {
      await db.collection('workout').doc(id).delete();
      toast.success(id + ' Workout deleted successfully!');
    } catch (error) {
      toast.error('Error deleting workout!');
    }
  };

  useEffect(() => {
    let completeCount = 0;
    let incompleteCount = 0;

    workout?.exercises?.forEach((item: any) => {
      item?.sets?.forEach((s: any) => {
        if (s === true) {
          completeCount++;
        } else {
          incompleteCount++;
        }
      });
    });

    setCompleted({ complete: completeCount, incomplete: incompleteCount });
  }, [workout]);

  const percentage = Math.round(
    (completed.complete / (completed.complete + completed.incomplete)) * 100,
  );
  console.log('completed', completed);
  return (
    <Card
      className={`my-4 mx-2 md:mx-0 ${
        workout?.done ? 'bg-green-100/10' : 'bg-red-100/10'
      }  md:mt-10 md:p-4 shadow-xl px-2 h-fit relative`}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        className=' md:h-40 md:w-40 shadow-md py-4 h-20 w-20'
        styles={buildStyles({
          rotation: 1,
          strokeLinecap: 'butt',
          textSize: '16px',
          pathTransitionDuration: 1,
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
      <CardBody className='p-3 md:p-3 ring-1 ring-gray-300  relative overflow-y-auto md:mb-20 md:h-96 mb-28 '>
        {workout?.exercises?.map((w: any) => {
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
                    {w.muscle}
                  </span>
                </p>
                <p className='uppercase w-fit  flex gap-4'>
                  <span className='bg-blue-gray-50 p-2 rounded-lg'>
                    Sets:{' '}
                    <span className='font-serif text-xl'>{w.sets.length}</span>
                  </span>
                  <span className='bg-blue-gray-50 p-2 rounded-lg'>
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
        className='grid grid-cols-3 gap-2  items-center justify-between  absolute bottom-1 '>
        <Tooltip content='Delete'>
          <Button
            className='flex text-gray-800 justify-between items-center bg-blue-gray-100'
            onClick={() => deleteWorkout(workout.id)}>
            <TrashIcon strokeWidth={2} className='h-5 w-5' />
          </Button>
        </Tooltip>
        {!workout?.done && (
          <Tooltip
            content={`${
              percentage > 0 ? 'resume the workout' : 'start the workout'
            }`}>
            <Button className='px-0 py-0  rounded-full  justify-center flex items-center  text-gray-200 '>
              <Modal workout={workout} percentage={percentage} />
            </Button>
          </Tooltip>
        )}
        <Tooltip content='NOT COMPLETE YET'>
          <Button
            disabled
            className='flex text-gray-800 justify-between items-center  bg-blue-gray-100'>
            <ShareIcon strokeWidth={2} className='h-5 w-5' />
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

export default Exercise;
