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
} from '@material-tailwind/react';

import UserProfileInfo from '@/components/user/UserProfileInfo';
import Message from '@/components/user/MessageCard';
import Link from 'next/link';
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/fireBase';
import { useUserLibrary } from '../firebase/usefirebaseUI';

function Profile() {
  const { currentUser, isLoading } = useAuth();
  const userID = currentUser?.uid!;
  const userDatas = useUserLibrary(currentUser?.uid);
  const userData = userDatas[0];
  const [newData, setNewData] = useState<any>(useUserLibrary(currentUser?.uid));
  const [openSettings, setOpenSettings] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendData(newData);
  };

  console.log(newData, userData);

  const getUsers = async () => {
    const colRef = collection(db, 'users');
    try {
      const docsSnap = await getDocs(colRef);
      if (docsSnap.docs.length > 0) {
        docsSnap.forEach((doc) => {
          console.log(doc.data());
          console.log(doc.id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendData = async (data: any) => {
    try {
      await setDoc(
        doc(
          db,
          'users',
          userID,
          'profileData',
          currentUser?.email?.toString()!
        ),
        { ...data }
      );
      setOpenSettings(!openSettings);
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof userData === 'object' && userData !== null) {
      const updatedData = {
        ...userData,
        [event.target.name]: event.target.value,
      };
      setNewData(updatedData);
      console.log(event.target.name, event.target.value, updatedData);
    }
  };

  const editProfile = () => {
    const inputCSS =
      'opacity-100 shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300 border-2';
    return (
      <form onSubmit={handleSubmit}>
        <UserProfileInfo
          title={'Profile Information'}
          description={
            <input
              type="text"
              name="description"
              placeholder={userData?.description}
              onChange={handleChange}
              className={inputCSS}
            />
          }
          details={{
            name: (
              <input
                type="text"
                name="firstName"
                placeholder={userData?.firstName}
                onChange={handleChange}
                className={inputCSS}
              />
            ),
            mobile: (
              <input
                type="text"
                name="mobile"
                placeholder={userData?.mobile}
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
  };

  const settings = () => {
    return (
      <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Platform Settings
          </Typography>
        </div>
        {openSettings ? (
          editProfile()
        ) : (
          <UserProfileInfo
            title={'Profile Information'}
            description={userData?.description}
            details={{
              'first name': userData?.firstName,
              mobile: userData?.mobile,
              email: currentUser?.email,
              location: userData?.location,
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
        )}
      </div>
    );
  };

  console.log(userData);
  getUsers;
  return (
    <>
      <div className="  min-h-screen   justify-center items-center bg-blue-gray-400 text-center ">
        <div className="h-72 md:h-96 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center"></div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 ">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-6">
                <Avatar
                  src="/fittness.svg"
                  alt="bruce-mars"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {currentUser?.email}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Lamb of the silence
                  </Typography>
                </div>
              </div>
              <div className="w-96">
                <Tabs value="app">
                  <TabsHeader>
                    <Tab value="app">
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      App
                    </Tab>
                    <Tab value="message">
                      <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                      Message
                    </Tab>
                    <Tab value="settings">
                      <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Settings
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>

            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                Architects design houses
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default Profile;
