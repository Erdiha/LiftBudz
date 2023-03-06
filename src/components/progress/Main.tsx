import React, { MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import Model, {
  IExerciseData,
  IModelProps,
  IMuscleStats,
} from 'react-body-highlighter';
import { Card, Tooltip, CardBody, Button } from '@material-tailwind/react';
import { bodyParts } from '../data/data';
import WorkoutCard from './WorkoutCard';
import { Fragment, useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function Main({
  selectedItem,
  incrementRef,
  setSelectedItem,
  sets,
  setSets,
  reps,
  setReps,
  isReps,
  setIsReps,
  savedWorkouts,
  setSavedWorkouts,
}: any) {
  const [front, setFront] = React.useState(true);
  const [muscleValue, setMuscleValue]: any = React.useState();
  const [open, setOpen] = useState<number>(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const initialData: IExerciseData[] = [];
  const [data, setData] = useState<IExerciseData[]>([
    { name: 'Bench Press', muscles: ['triceps'] },
  ]);

  const handleReset = () => {
    setData(initialData);
    setMuscleValue(null);
  };

  const handleClick = React.useCallback(
    ({ muscle, data }: IMuscleStats) => {
      const { exercises, frequency } = data;

      console.log(exercises);
      setMuscleValue(
        <div className='flex flex-col text-gray-600'>
          <p className='p-1 '>
            Muscle Name is{' '}
            <span className='text-blue-500 text-semibold tracking-wider text-xl italic'>
              {muscle}
            </span>{' '}
          </p>
          <p className='p-1'>
            Worked {muscle} {'  '}
            <span className='text-blue-400 text-semibold tracking-wider text-xl'>
              {frequency}
            </span>{' '}
            times
          </p>
          {exercises?.length > 0 && (
            <p className='p-1'>
              Execise is:{' '}
              <span className='text-blue-400 text-semibold tracking-wider text-xl'>
                {exercises.join(', ')}
              </span>{' '}
            </p>
          )}
        </div>,
      );
    },
    [data, []],
  );

  return (
    <div className='flex flex-col md:flex-row  w-full bg-gray-100 p-4'>
      <div className='md:flex flex-col p-4 hidden  transition-all duration-300 ease-in-out ring-1  md:m-0  shadow-md md:h-fit'>
        <div className=' flex w-full justify-between'>
          {' '}
          <button
            onClick={() => setFront(!front)}
            className=' backdrop-blur  rounded p-1 font-semibold text-gary-500 md:hover:bg-gray-300 transition-all duration-300 ease-in-out  md:hover:ring-1 border'>
            {front ? 'Show Back' : 'Show Front'}
          </button>
          <Tooltip content='resets the progress and the choice'>
            <button
              onClick={handleReset}
              className=' backdrop-blur  rounded p-1 font-semibold text-gary-500 md:hover:bg-gray-300 transition-all duration-300 ease-in-out md:hover:ring-1 border'>
              Reset
            </button>
          </Tooltip>
        </div>
        <div className='model-wrapper flex w-full items-center justify-center'>
          {front ? (
            <Model data={data} onClick={handleClick} />
          ) : (
            <Model
              type='posterior'
              data={data}
              highlightedColors={['#e65a5a', '#db2f2f']}
              onClick={handleClick}
            />
          )}
        </div>
        {muscleValue && (
          <animated.div className=' backdrop-blur shadow-lg   bg-white/10 flex-wrap rounded border border-gray-400 p-1'>
            {muscleValue}
          </animated.div>
        )}
      </div>

      <div className='w-full h-fit  xl:grid-cols-3 p-2 gap-5'>
        {bodyParts?.map((part: any, index: number) => {
          return (
            <Accordion key={index} open={open === index + 1}>
              <AccordionHeader
                className='px-2 uppercase'
                onClick={() => handleOpen(index + 1)}>
                {part.title}
              </AccordionHeader>
              <AccordionBody className='h-fit mt-4 flex justify-center'>
                {' '}
                <div className='flex w-full h-full flex-col md:flex-row justify-around items-center'>
                  <WorkoutCard
                    title={part.title}
                    icon={part.icon}
                    key={index}
                    subItems={part.types}
                    reps={reps}
                    setReps={setReps}
                    incrementRef={incrementRef}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                    sets={sets}
                    setSets={setSets}
                    isReps={isReps}
                    setIsReps={setIsReps}
                    muscle={selectedItem}
                    muscleGroup={part.title}
                  />
                  <ExerciseTrack
                    muscleGroup={part.title}
                    muscle={selectedItem}
                    reps={reps}
                    sets={sets}
                    setSets={setSets}
                    setReps={setReps}
                    isReps={isReps}
                    setIsReps={setIsReps}
                    savedWorkouts={savedWorkouts}
                    setSavedWorkouts={setSavedWorkouts}
                  />
                </div>
              </AccordionBody>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

const ExerciseTrack = ({
  muscleGroup,
  reps,
  muscle,
  sets,
  savedWorkouts,
  setSavedWorkouts,
  isReps,
}: any) => {
  console.log('workouts', savedWorkouts);
  const setsRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const repsRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);

  useEffect(() => {
    if (setsRef.current?.classList && repsRef.current?.classList) {
      const setsEl = setsRef.current;
      const repsEl = repsRef.current;
      !isReps
        ? setsEl.classList.add(
            'animate-bounce',
            'font-black',
            'text-2xl',
            'text-red-400',
          )
        : repsEl.classList.add(
            'animate-bounce',
            'font-black',
            'text-2xl',
            'text-red-400',
          );
      setTimeout(() => {
        !isReps
          ? setsEl.classList.remove(
              'animate-bounce',
              'font-black',
              'text-2xl',
              'text-red-400',
            )
          : repsEl.classList.remove(
              'animate-bounce',
              'font-black',
              'text-2xl',
              'text-red-400',
            );
      }, 800);
    }
  }, [sets, reps]);
  console.log('muscle', muscle, 'muscleGroup', muscleGroup);
  return (
    <div className='p-4 bg-white rounded-lg h-full w-full shadow-md md:w-[40%] '>
      <p className='font-bold text-lg border-b-2 mb-4'>Exercise Card</p>
      <p className='mb-2 text-sm md:text-md xl:text-xl font-normal'>
        Muscle Group: <span className='font-semibold'>{muscleGroup}</span>
      </p>
      <p className='mb-2 font-normal  text-sm md:text-md xl:text-xl'>
        {' '}
        Selected Muscle:{' '}
        <span className='font-semibold'> {muscle ? muscle : 'None'}</span>
      </p>
      <div className='grid md:grid-flow-col grid-flow-row grid-cols-2 justify-around pb-2  '>
        <p className='relative flex h-full w-36 text-sm md:text-md xl:text-xl font-normal border-l-2 pl-2 border-gray-300'>
          Reps:{' '}
          <span
            ref={repsRef}
            className='font-semibold flex justify-center w-8 h-8 pl-2'>
            {reps}
          </span>
        </p>

        <p className='relative flex h-full w-36 text-sm md:text-md xl:text-xl font-normal border-l-2 pl-2 border-gray-300'>
          Sets:{' '}
          <span
            ref={setsRef}
            className='font-semibold flex justify-center w-8 h-8 pl-2'>
            {sets}
          </span>
        </p>
      </div>

      <Tooltip content='creates the workout'>
        <Button
          onClick={() => {
            let warningMessage = '';

            if (muscle === null) {
              warningMessage += 'Please select a  muscle. ';
            }
            else if (reps === 0) {
              warningMessage += 'Pelase select a number of reps. ';
            }
            else if (sets === 0) {
              warningMessage += 'Please select a number of sets. ';
            }
            if (warningMessage !== '') {
              toast.warn(warningMessage);
            } else {
              setSavedWorkouts([
                ...savedWorkouts,
                {
                  muscleGroup,
                  reps: { reps: reps, done: false },
                  muscle,
                  sets: Array.from({ length: sets }, () => false),
                },
              ]);
              toast.success('Workout Added');
            }
          }}
          className='shadow rounded p-1 bg-blue-gray-100 text-black/90 font-semibold smd:hover:text-white col-span-1 self-end w-full  tracking-wider'>
          ADD
        </Button>
      </Tooltip>
    </div>
  );
};
