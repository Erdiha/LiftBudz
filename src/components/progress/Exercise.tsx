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

  return (
    <Card className=' min-h-96 mt-10 p-4 shadow-xl '>
      <CircularProgressbar
        value={calculatePercentage.current}
        text={`${calculatePercentage.current}`}
        className=' h-40 w-40 shadow-md py-4'
        styles={buildStyles({
          textColor: '#4B5563',
          pathColor: '#4F46E5',
          trailColor: '#D1D5DB',
        })}
      />

      {workout?.exercises.map((w: any) => {
        calculatePercentage.current = (w.reps * w.sets) / 100;
        return (
          <>
            <CardBody>
              <Typography variant='h5' className='mb-2 font-serif '>
                Muscle Group:{' '}
                <span className='text-gray-600 uppercase tracking-wider'>
                  {w.muscleGroup}
                </span>
              </Typography>
              <Typography variant='h6' className='font-serif'>
                <p className='font-sans'>
                  Target Muscle:{' '}
                  <span className='text-gray-600 uppercase tracking-wider font-serif'>
                    {' '}
                    {w.muscle}
                  </span>
                </p>
                <p className='uppercase w-fit  flex gap-4'>
                  {' '}
                  <span className='bg-blue-gray-50 p-2 rounded-lg'>
                    {' '}
                    Sets: <span className='font-serif text-xl'>{w.sets}</span>
                  </span>
                  <span className='bg-blue-gray-50 p-2 rounded-lg'>
                    {' '}
                    Reps: <span className='font-serif text-xl'>{w.reps}</span>
                  </span>
                </p>
              </Typography>
            </CardBody>
          </>
        );
      })}
      <CardFooter divider className='flex items-center justify-between py-3'>
        <Button
          className='flex text-gray-800 justify-between items-center gap-2 p-3 bg-blue-gray-100'
          onClick={() => deleteWorkout(workout.id)}>
          <TrashIcon strokeWidth={2} className='h-5 w-5' />
          delete
        </Button>
        <Button className='start-button rounded-full py-0 px-0 w-20 aspect-square   text-gray-200 '>
          START
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
