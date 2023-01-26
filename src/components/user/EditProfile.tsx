import useAuth from '@/firebase/usefirebaseUI';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserProfileInfo from './UserProfileInfo';
import {
  doc,
  setDoc,
  DocumentData,
  onSnapshot,
  collection,
} from 'firebase/firestore';
import { db } from '@/firebase/fireBase';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userProfile, updateUserProfile } from '../../../recoilAtom';

export const useUserLibrary = (UID: undefined | string) => {
  const [getList, setGetList] = useState<any>();
  useEffect(() => {
    if (!UID) return;

    return onSnapshot(
      collection(db, 'users', UID, 'profileData'),
      (snapshot) => {
        setGetList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, UID]);

  return getList;
};

export default function Edit() {
  const inputCSS =
    'opacity-100 shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300 border-2';
  const [profileData, setProfileData]: any = useState(null);
  const [openSettings, setOpenSettings] = useRecoilState(updateUserProfile);

  const { currentUser, isLoading } = useAuth();
  const userID = currentUser!.uid;
  console.log(useUserLibrary(userID));
  const sendData = async () => {
    // make api call to update profile

    await setDoc(
      doc(db, 'users', userID, 'profileData', currentUser?.email!.toString()!),
      {
        ...profileData,
      }
    );
    setOpenSettings(!openSettings);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={sendData}>
      <UserProfileInfo
        title={'Profile Information'}
        description={
          <input
            type="text"
            name="description"
            placeholder={profileData?.description}
            onChange={handleChange}
            className={inputCSS}
          />
        }
        details={{
          name: (
            <input
              type="text"
              name="firstName"
              placeholder={profileData?.firstName}
              onChange={handleChange}
              className={inputCSS}
            />
          ),
          mobile: (
            <input
              type="text"
              name="mobile"
              placeholder={profileData?.mobile}
              onChange={handleChange}
              className={inputCSS}
            />
          ),
          email: currentUser?.email,
          location: null,
          social: (
            <div className="flex items-center gap-4">
              <i className="fa-brands fa-facebook text-blue-700" />
              <i className="fa-brands fa-twitter text-blue-400" />
              <i className="fa-brands fa-instagram text-purple-500" />
            </div>
          ),
        }}
        isEditable={openSettings}
        action={
          <button
            type="submit"
            value="Submit"
            // onClick={() => }
            className=" p-1 cursor-pointer text-center bg-blue-gray-200 font-bold shadow-light border"
          >
            save
          </button>
        }
      />
    </form>
  );
}
