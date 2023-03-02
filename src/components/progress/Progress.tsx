import { Button, Tooltip } from '@material-tailwind/react';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Main from './Main';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import firebase, { auth, db } from '@/firebase/firebase';
import Exercises from './Exercises';

interface ProgressProps {
  activeTab: string | null;
  openSideBar: boolean;
  setActiveTab: (activeTab: string) => void;
  setOpenSideBar: (openSideBar: boolean) => void;
}

interface WorkoutState {
  userId: string;
  timestamp: any;
  createdAt: any;
  exercises: [];
}

function Progress({
  activeTab,
  setActiveTab,
  setOpenSideBar,
  openSideBar,
}: ProgressProps) {
  const workoutPlans = [];

  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [isReps, setIsReps] = useState(true);
  const incrementRef = useRef(1);
  const [selectedItem, setSelectedItem]: any = useState(null);
  const [allWorkouts, setAllWorkouts]: any = useState([]);

  const [savedWorkouts, setSavedWorkouts]: any = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const [showExercise, setShowExercise] = useState(false);

  const handleFinish = async () => {
    setIsSaving(true);
    try {
      const workoutCollection = db.collection('workout');
      workoutCollection.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Create the workout collection if it does not exist
          db.collection('workout').doc();
        }
      });
      await workoutCollection.add({
        userId: auth?.currentUser?.uid,
        tiemstamp: Date.now(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        exercises: [...savedWorkouts],
      });
      toast.success('Exercise added successfully!');

      // update savedWorkouts state with new muscle values
    } catch (error) {
      console.error('Error adding workout to Firestore:', error);
      toast.error('An error occurred while adding the exercise.');
    } finally {
      setIsSaving(false);
      setSavedWorkouts([]);
      setSelectedItem(null);
      incrementRef.current = 1;
      setIsReps(true);
      setSets(0);
      setReps(0);
    }
  };
  console.log(
    'all Workouts',
    savedWorkouts,
    'type',
    typeof savedWorkouts,
    'selectedItem',
    selectedItem,
  );
  return (
    <div className='mt-[5rem] w-full  md:px-8 md:py-4 flex flex-col '>
      <div className='flex w-full md:py-4 justify-between tracking-widest p-2'>
        <Button
          onClick={() => {
            setOpenSideBar(!openSideBar);
          }}
          className='justify-start tracking-wider'
          variant='gradient'>
          MENU
        </Button>
        <div className='flex gap-4'>
          {' '}
          <Tooltip content='Saves The Workout'>
            <Button
              disabled={
                savedWorkouts.length === 0 ||
                selectedItem === null ||
                reps === 0 ||
                sets === 0
              }
              onClick={handleFinish}
              className='justify-start tracking-wider'
              variant='gradient'>
              Save Workout
            </Button>
          </Tooltip>
          <Tooltip content='Displays all workouts'>
            <Button
              color='gray'
              onClick={() => setShowExercise(!showExercise)}
              className='justify-start tracking-wider '
              variant='gradient'>
              {`${showExercise ? 'Add Exercise' : 'Show Exercises'} `}
            </Button>
          </Tooltip>
        </div>
      </div>

      {showExercise ? (
        <Exercises />
      ) : (
        <Main
          selectedItem={selectedItem}
          incrementRef={incrementRef}
          setSelectedItem={setSelectedItem}
          reps={reps}
          sets={sets}
          setReps={setReps}
          setSets={setSets}
          isReps={isReps}
          setIsReps={setIsReps}
          allWorkouts={allWorkouts}
          setAllWorkouts={setAllWorkouts}
          savedWorkouts={savedWorkouts}
          setSavedWorkouts={setSavedWorkouts}
        />
      )}
    </div>
  );
}

export default Progress;
