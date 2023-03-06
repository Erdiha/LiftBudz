import { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardBody,
  Checkbox,
  Typography,
  Tooltip,
  DialogProps,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import firebase, { db } from '@/firebase/firebase';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';

export default function Modal({ workout, percentage }: any) {
  const [archieve, setArchieve] = useState(false);
  const [open, setOpen] = useState(false);

  const handleArchieve = async () => {
    // const workoutDoc = await db.collection('workout').doc(workout.id).get();
    // const workoutData = workoutDoc.data();
    // if(workoutData){
    //   workoutDoc.ref.update({ done: true });
    // }
    try {
      await db.collection('workout').doc(workout.id).update({ done: true });
      toast.success('Workout archieved successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
    }
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    val: any,
    i: number,
    index: number,
  ) => {
    const { checked } = event.target;
    try {
      const workoutDoc = await db.collection('workout').doc(workout.id).get();
      const workoutData = workoutDoc.data();

      if (workoutData) {
        const updatedSets = [...workoutData.exercises[index].sets];
        updatedSets[i] = checked ? true : false;
        console.log('updatedSets is', updatedSets[i]);
        const updatedExercises = [...workoutData.exercises];
        updatedExercises[index].sets = updatedSets;
        await db
          .collection('workout')
          .doc(workout.id)
          .update({ exercises: updatedExercises });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleOpen = () => setOpen(!open);

  useEffect(() => {}, [workout]);

  return (
    <Fragment>
      <Button
        className=' tracking-widest rounded-full w-full h-full '
        onClick={handleOpen}>
        {percentage > 0 ? (
          <AiFillPauseCircle strokeWidth={2} className='h-5 w-5' />
        ) : (
          <AiFillPlayCircle strokeWidth={2} className='h-5 w-5' />
        )}
      </Button>

      <Dialog
        className=' p-4 px-4  md:p-20 lg:px-[10rem]  xl:px-[15rem]  2xl:px-[20rem]  backdrop-blur-md bg-white/80'
        open={open}
        size={'xxl'}
        handler={handleOpen}>
        <DialogHeader>WORKOUT</DialogHeader>
        <DialogBody className='  bg-gray-100' divider>
          {workout?.exercises?.map((w: any, mainIndex: number) => {
            return (
              <>
                {' '}
                <CardBody className='grid md:grid-flow-col grid-flow-rows md:grid-cols-[3fr,4fr,4fr] border-4 border-gray-500 mb-1'>
                  <Typography
                    variant='h6'
                    className=' p-1 text-sm md:text-md my-auto w-full '>
                    Muscle:{' '}
                    <span className='text-gray-600 uppercase tracking-wide'>
                      {w?.muscleGroup}
                    </span>
                    <p className=''>
                      Target:{' '}
                      <span className='text-gray-600 uppercase tracking-wide '>
                        {' '}
                        {w?.muscle}
                      </span>
                    </p>
                  </Typography>
                  <Typography
                    variant='h6'
                    className='font-serif flex-col md:border-r-2  flex justify-center p-1 items-center '>
                    <p>Sets In Progress</p>
                    <Tooltip content='click to done'>
                      <p className='grid grid-cols-3 gap-1 h-full text-red-400 border-b-2 '>
                        {w?.sets?.map((s: any, index: number) => {
                          return (
                            s === false && (
                              <Checkbox
                                className='text-red-400 bg-red-400'
                                key={index}
                                onChange={(event) =>
                                  handleCheckboxChange(
                                    event,
                                    w,
                                    index,
                                    mainIndex,
                                  )
                                }
                                label={'S' + (index + 1)}
                              />
                            )
                          );
                        })}
                      </p>
                    </Tooltip>
                  </Typography>
                  <Typography
                    variant='h6'
                    className='font-serif items-center flex-col flex md:border-l-2 border-gray-400 justify-center p-1'>
                    <p>Sets Done</p>
                    <Tooltip content='click to undone'>
                      <p className='grid grid-cols-3 gap-1 h-full'>
                        {w?.sets?.map((s: any, index: number) => {
                          return (
                            s === true && (
                              <Checkbox
                                key={index}
                                onChange={(event) =>
                                  handleCheckboxChange(
                                    event,
                                    w,
                                    index,
                                    mainIndex,
                                  )
                                }
                                label={'S' + (index + 1)}
                                color='blue'
                                defaultChecked={true}
                              />
                            )
                          );
                        })}
                      </p>
                    </Tooltip>
                  </Typography>
                </CardBody>
              </>
            );
          })}
        </DialogBody>
        <DialogFooter className=''>
          <Button
            variant='text'
            color='red'
            ripple
            onClick={() => handleOpen()}
            className='mr-1 ring-1 ring-red-400'>
            Finish Later
          </Button>
          <Button
            disabled={percentage !== 100}
            ripple
            variant='gradient'
            className='ring-1 '
            color='blue'
            onClick={() => {
              handleOpen();
              handleArchieve();
            }}>
            DONE
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
