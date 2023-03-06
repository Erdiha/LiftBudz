import { serverTimestamp } from 'firebase/firestore';



export const bodyParts = [
  {
    title: 'Back',
    types: ['all', 'trapezius', 'upper-back', 'lower-back'],
    icon: '/back.png',
  },
  { title: 'Chest', types: ['all', 'chest'], icon: '/body.png' },
  {
    title: 'Arms',
    types: [
      'all',
      'biceps',
      'triceps',
      'forearm',
      ' back-deltoids',
      'front-deltoids',
    ],
    icon: '/arm.png',
  },
  {
    title: 'Legs',
    types: [
      'all',
      'quadriceps',
      'hamstring',
      'gluteal',
      'calves',
      'adductor',
      'abductors',
      'right-soleus',
      'left-soleus',
      'knees',
    ],
    icon: '/leg.png',
  },
  {
    title: 'Core',
    types: ['all', 'abductors', 'abs', 'adductor', 'obliques'],
    icon: '/torso.png',
  },
  { title: 'Head', types: ['all', 'head', 'neck'], icon: '/head.png' },
  { title: 'Abs', types: ['all', 'abs', 'obliques'], icon: '/abs.png' },
];
