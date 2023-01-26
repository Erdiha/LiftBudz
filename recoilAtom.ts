import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';

export const userProfile = atom<DocumentData>({
  key: 'userProfile',
  default: {},
});

export const updateUserProfile = atom({
  key: 'updateUserProfile',
  default: false,
});
