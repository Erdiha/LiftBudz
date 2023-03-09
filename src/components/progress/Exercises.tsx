import React, { useState, useEffect } from 'react';
import { auth, db } from '@/firebase/firebase';
import Exercise from './Exercise';

interface WorkoutState {
  muscleGroup: string;
  reps: number;
  muscle: string;
  sets: number;
}
function Exercises({ showFinishedProjects }: any) {
  const [workouts, setWorkouts]: any = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection('workout')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newWorkouts = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as { userId: string }), // add type annotation here
          }))
          .filter((workout) => workout.userId === auth?.currentUser?.uid);
        setWorkouts(newWorkouts);
      });

    return unsubscribe;
  }, []);

  console.log('these are the workouts', workouts);
  return (
    <div className='grid grid-cols-1 md:gap-16  lg:grid-cols-2 w-full h-full overflow-x-hidden md:p-10 p-4'>
      {workouts?.map((workout: any) =>
        !showFinishedProjects
          ? !workout?.done && <Exercise key={workout.id} workout={workout} />
          : workout?.done && <Exercise key={workout.id} workout={workout} />,
      )}
    </div>
  );
}

export default Exercises;
