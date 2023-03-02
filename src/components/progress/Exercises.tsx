import React, { useState, useEffect } from 'react';
import { auth, db } from '@/firebase/firebase';
import Exercise from './Exercise';

interface WorkoutState {
  muscleGroup: string;
  reps: number;
  muscle: string;
  sets: number;
}
function Exercises() {
  const [workouts, setWorkouts]: any = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('workout')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newWorkouts = snapshot.docs.map(
          (doc) =>
            doc.data().userId === auth?.currentUser?.uid && {
              id: doc.id,
              ...doc.data(),
            },
        );
        setWorkouts(newWorkouts);
      });

    return unsubscribe;
  }, []);
  console.log('these are the workouts', workouts);
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full h-full'>
      {workouts?.map((workout: any) => (
        <Exercise key={workout.id} workout={workout} />
      ))}
    </div>
  );
}

export default Exercises;
