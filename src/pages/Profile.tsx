import React, { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';
import useAuth from '@/firebase/firebaseUI';
import { useUserLibrary } from '@/firebase/firebaseUI';
import { useForm } from 'react-hook-form';
import Loading from '@/utils/Loading';
import { Input } from '@material-tailwind/react';

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
import Message from '@/components/user/Message';
import Link from 'next/link';
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { is } from '@react-spring/shared';

interface IProfile {
  id: string;
  firstName: string;
  mobile?: string;
  age?: string | number;
  description?: string;
  email: string;
  location?: string;
  profileImage?: string;
}
function Profile() {
  const { currentUser, isLoading } = useAuth();
  let userDatas: any = useUserLibrary(currentUser?.uid);
  let userData: any;
  if (userDatas) {
    userData = userDatas[0];
  }
  let formData: any = useUserLibrary(currentUser?.uid);
  const [newData, setNewData] = useState<any>(userData);
  //const [userData, setUserData] = useState<DocumentData>();
  const router = useRouter();
  const [openSettings, setOpenSettings] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleChange = (event: any) => {
    console.log('event name', event.target.name);
    setNewData({ ...newData, [event.target.name]: event.target.value });
    console.log('newData sent', newData);
  };

  const sendData = async () => {
    // make api call to update profile
    const userID = currentUser!.uid;

    alert('sending');
    console.log('this is formdata', formData);
    await setDoc(
      doc(db, 'users', userID, 'profileData', currentUser?.email!.toString()!),
      {
        ...newData,
      }
    );
    setOpenSettings(!openSettings);
  };

  if (isLoading) return <Loading />;
  if (!currentUser) {
    router.push('/');
    return null;
  }

  const projectsData: any[] = [];
  const conversationsData: any[] = [];
  const inputCSS =
    'opacity-100 shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300 border-2';
  const editProfile = () => {
    return (
      <form onSubmit={handleSubmit(sendData)}>
        <UserProfileInfo
          title={'Profile Information'}
          description={
            <input
              type="text"
              name="description"
              placeholder={userData.description}
              onChange={handleChange}
              className={inputCSS}
            />
          }
          details={{
            name: (
              <input
                type="text"
                name="firstName"
                placeholder={userData.firstName}
                onChange={handleChange}
                className={inputCSS}
              />
            ),
            mobile: (
              <input
                type="text"
                name="mobile"
                placeholder={userData.mobile}
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

  // console.log(userData, userDatas);
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
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Platform Settings
                </Typography>
              </div>
              {openSettings
                ? editProfile()
                : userData && (
                    <UserProfileInfo
                      title={'Profile Information'}
                      description={userData.description}
                      details={{
                        'first name': userData.firstName,
                        mobile: userData.mobile,
                        email: userData.email,
                        location: userData.location,
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
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Platform Settings
                </Typography>
                <ul className="flex flex-col gap-6">
                  {conversationsData.map((props) => (
                    <Message
                      key={props.name}
                      {...props}
                      action={
                        <Button variant="text" size="sm">
                          reply
                        </Button>
                      }
                    />
                  ))}
                </ul>
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
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                {projectsData.map(
                  ({ img, title, description, tag, route, members }: any) => (
                    <Card key={title} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                      >
                        <img
                          src={img}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="py-0 px-1">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {tag}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {title}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {description}
                        </Typography>
                      </CardBody>
                      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                        <Link href={route}>
                          <Button variant="outlined" size="sm">
                            view project
                          </Button>
                        </Link>
                        <div>
                          {members.map(({ img, name }: any, key: any) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? '' : '-ml-2.5'
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </div>
                      </CardFooter>
                    </Card>
                  )
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default Profile;
