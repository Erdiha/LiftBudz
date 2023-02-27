import React, { ReactNode } from 'react';
import Model, {
  IExerciseData,
  IModelProps,
  IMuscleStats,
} from 'react-body-highlighter';
import { Card, Tooltip, CardBody } from '@material-tailwind/react';
import { bodyParts } from '../data/data';
import WorkoutCard from './WorkoutCard';
import { Fragment, useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { animated } from 'react-spring';
export default function AnatomyCard() {
  const [front, setFront] = React.useState(true);
  const [muscleClicked, setMuscleClicked] = React.useState(false);
  const [muscleValue, setMuscleValue]: any = React.useState();
  const [open, setOpen] = useState<number>(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const initialData: IExerciseData[] = [];
  const [data, setData] = useState<IExerciseData[]>([
    { name: 'Bench Press', muscles: ['triceps'] },
    { name: 'Push Ups', muscles: ['abs'] },
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
    <div className='flex flex-col md:flex-row h-full w-full bg-gray-100 p-4'>
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
        {bodyParts.map((part: any, index: number) => {
          return (
            <Accordion key={index} open={open === index + 1}>
              <AccordionHeader
                className='px-2 uppercase'
                onClick={() => handleOpen(index + 1)}>
                {part.title}
              </AccordionHeader>
              <AccordionBody className='h-fit mt-4 flex justify-center'>
                {' '}
                <WorkoutCard
                  title={part.title}
                  icon={part.icon}
                  key={index}
                  subItems={part.types}
                />
              </AccordionBody>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
