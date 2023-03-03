import { Fragment, useState } from 'react';
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

export default function Modal({ workout }: any) {
  const [size, setSize] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <Fragment>
      <button className='w-full h-full' onClick={handleOpen}>
        START
      </button>

      <Dialog
        className=' p-4 md:p-20 backdrop-blur-md bg-white/80'
        open={open}
        size={'xxl'}
        handler={handleOpen}>
        <DialogHeader>WORKOUT</DialogHeader>
        <DialogBody className='  bg-gray-100' divider>
          {workout?.exercises.map((w: any, mainIndex: number) => {
            return (
              <>
                {' '}
                <CardBody className='grid md:grid-flow-col grid-flow-rows md:grid-cols-[2fr,3fr,3fr] border-4 border-gray-500 mb-1'>
                  <Typography
                    variant='h5'
                    className='mb-2 font-serif p-1 w-fit text-sm md:text-md border-b-2'>
                    Muscle Group:{' '}
                    <span className='text-gray-600 uppercase tracking-wider'>
                      {w.muscleGroup}
                    </span>
                    <p className=''>
                      Target Muscle:{' '}
                      <span className='text-gray-600 uppercase tracking-wider font-serif'>
                        {' '}
                        {w.muscle}
                      </span>
                    </p>
                  </Typography>
                  <Typography
                    variant='h6'
                    className='font-serif flex-col md:border-r-2  flex justify-center p-1 items-center '>
                    <p>Sets In Progress</p>
                    <Tooltip content='click to done'>
                      <p className='flex w-max gap-1 text-red-400 border-b-2 '>
                        {w.sets.map((s: any, index: number) => {
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
                      <p className='flex w-max gap-1'>
                        {w.sets.map((s: any, index: number) => {
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
            <span>Finish Later</span>
          </Button>
          <Button
            ripple
            variant='gradient'
            className='ring-1 '
            color='blue'
            onClick={() => {
              handleOpen();
            }}>
            <span>DONE</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
