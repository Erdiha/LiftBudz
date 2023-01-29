import React, { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';
import useAuth from '@/firebase/usefirebaseUI';

import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Input,
} from '@material-tailwind/react';

import UserProfileInfo from '@/components/profile/ProfileCard';
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db, auth, firebase } from '@/firebase/fireBase';
import { useUserLibrary } from '../firebase/usefirebaseUI';

function Profile() {
  const { currentUser, isLoading } = useAuth();
  const userID = currentUser?.uid!;
  const { getAllUsers, getCurrentUser, getList } = useUserLibrary(userID);
  const [userData, setUserData]: any = useState(getCurrentUser);
  const [newData, setNewData] = useState<any>(useUserLibrary(currentUser?.uid));
  const [openSettings, setOpenSettings] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setOpenSettings(false);
    e.preventDefault();
    sendData(newData);
  };
  //console.log('this is currentdata', getAllUsers, getCurrentUser);
  const sendData = async (data: any) => {
    console.log('this is data', data);
    try {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.get();
      await Promise.all(
        snapshot.docs.map((doc) => {
          doc.data().userId === userID && doc.ref.update({ ...data });
        }),
      );
      setOpenSettings(!openSettings);
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  };

  console.log(getAllUsers, userData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = {
      ...userData,
      [event.target.name]: event.target.value,
    };
    setNewData(updatedData);
  };

  const editProfile = () => {
    const inputCSS =
      'opacity-100 shadow appearance-none  rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300 border-2';
    return (
      <form onSubmit={handleSubmit}>
        <UserProfileInfo
          title={'Profile Information'}
          description={
            <Input
              type="text"
              name="description"
              label={getCurrentUser?.description}
              onChange={handleChange}
              className={inputCSS}
            />
          }
          details={{
            displayName: (
              <Input
                type="text"
                name="displayName"
                label={getCurrentUser?.displayName}
                onChange={handleChange}
                className={inputCSS}
              />
            ),
            mobile: (
              <Input
                type="text"
                name="mobile"
                label={getCurrentUser?.mobile}
                onChange={handleChange}
                className={inputCSS}
              />
            ),
            email: currentUser?.email,
            location: (
              <Input
                type="text"
                name="location"
                label={getCurrentUser?.location}
                onChange={handleChange}
                className={inputCSS}
              />
            ),
          }}
          isEditable={openSettings}
          action={
            <div className="flex gap-2">
              <Button
                type="submit"
                className=" p-2 cursor-pointer text-center font-bold shadow-light border"
              >
                Save
              </Button>
            </div>
          }
        />
      </form>
    );
  };

  const settings = () => {
    return (
      <div className="g mb-12  w-full px-10">
        {openSettings ? (
          editProfile()
        ) : (
          <>
            {' '}
            <UserProfileInfo
              title={'Profile Information'}
              description={getCurrentUser?.description}
              details={{
                displayName: getCurrentUser?.displayName,
                mobile: getCurrentUser?.mobile,
                email: currentUser?.email || getCurrentUser?.email,
                location: getCurrentUser?.location,
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
                <Tooltip content="Edit Profile">
                  <PencilIcon
                    onClick={() => setOpenSettings(!openSettings)}
                    className="h-4 w-4 cursor-pointer text-blue-gray-500"
                  />
                </Tooltip>
              }
            />
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="m-auto max-w-7xl  pb-4  flex flex-col justify-center items-center bg-blue-gray-900 ">
        <div className=" h-72 md:h-96 w-full  overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center"></div>
        <Card className="-mt-16 mb-6 lg:mx-4  max-w-5xl mx-auto w-[50%] backdrop-blur-md bg-white/80 ">
          <CardBody className="p-4 w-full flex flex-col ">
            <div className="mb-10 flex items-center justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-6 ">
                <Avatar
                  src="/fittness.svg"
                  alt="bruce-mars"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {getCurrentUser?.displayName}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {openSettings ? (
                      <form onSubmit={handleSubmit}>
                        {' '}
                        <Input
                          type="text"
                          name="profileMotto"
                          label={getCurrentUser?.profileMotto}
                          onChange={handleChange}
                        />
                      </form>
                    ) : (
                      getCurrentUser?.profileMotto
                    )}
                  </Typography>
                </div>
              </div>
            </div>
            {settings()}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default Profile;
