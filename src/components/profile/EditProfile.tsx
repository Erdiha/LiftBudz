import { updateUser } from '@/redux/updateCurrentUserData';
import { Tooltip, Button, Input } from '@material-tailwind/react';
import ProfileCard from './ProfileCard';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import { PencilIcon } from '@heroicons/react/24/outline';

export const EditProfile = ({
  setOpenSettings,
  userData,
  setUserData,
  openSettings,
  getCurrentUser,
  currentUser,
}: any) => {
  const dispatch: any = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setOpenSettings(false);
    e.preventDefault();
    sendData(userData);
  };
  const sendData = async (data: any) => {
    console.log('sending user data in edit profile', data);
    dispatch(updateUser(data));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = {
      ...userData,
      [event.target.name]: event.target.value,
    };
    setUserData(updatedData);
  };

  const inputCSS =
    'opacity-100 shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300 border-2';
  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <ProfileCard
        title={'Profile Information'}
        description={
          <Input
            type='text'
            name='description'
            label={getCurrentUser?.description}
            onChange={handleChange}
            className={inputCSS}
          />
        }
        details={{
          displayName: (
            <Input
              type='text'
              name='displayName'
              label={getCurrentUser?.displayName}
              onChange={handleChange}
              className={inputCSS}
            />
          ),
          mobile: (
            <Input
              type='text'
              name='mobile'
              label={getCurrentUser?.mobile}
              onChange={handleChange}
              className={inputCSS}
            />
          ),
          email: currentUser?.email,
          location: (
            <Input
              type='text'
              name='location'
              label={getCurrentUser?.location}
              onChange={handleChange}
              className={inputCSS}
            />
          ),
        }}
        isEditable={openSettings}
        action={
          <div className='flex gap-2'>
            <Button
              type='submit'
              className=' p-2 cursor-pointer text-center font-bold shadow-light border'>
              Save
            </Button>
          </div>
        }
      />
    </form>
  );
};

export function Settings() {
  const { currentUser, isLoading } = useAuth();
  const userID = currentUser?.uid!;
  const { getAllUsers, getCurrentUser, getList } = useUserLibrary(userID);
  const [userData, setUserData]: any = useState(
    useSelector((state: any) => state.users),
  );

  const userInfo: any = useSelector((state: any) => state.users);
  const [openSettings, setOpenSettings] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);

  // if (isLoading){
  //   return <Loading/>
  // }

  return (
    <div className='flex  px-2 w-full'>
      {openSettings ? (
        EditProfile({
          setOpenSettings,
          userData,
          setUserData,
          openSettings,
          getCurrentUser,
          currentUser,
        })
      ) : (
        <>
          <ProfileCard
            title={'Profile Information'}
            description={getCurrentUser?.description}
            details={{
              displayName: getCurrentUser?.displayName,
              mobile: getCurrentUser?.mobile,
              email: currentUser?.email || getCurrentUser?.email,
              location: getCurrentUser?.location,
            }}
            isEditable={openSettings}
            action={
              <Tooltip content='Edit Profile'>
                <PencilIcon
                  onClick={() => setOpenSettings(!openSettings)}
                  className='h-4 w-4 cursor-pointer text-blue-gray-500'
                />
              </Tooltip>
            }
          />
        </>
      )}
    </div>
  );
}
