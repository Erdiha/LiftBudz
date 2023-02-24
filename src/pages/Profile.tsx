import React from 'react';
import useAuth from '@/firebase/usefirebaseUI';
import { Card, CardBody, Typography, Tooltip } from '@material-tailwind/react';
import { useUserLibrary } from '../firebase/usefirebaseUI';
import { Settings } from '@/components/profile/EditProfile';
import useFileUpload from '../hooks/useFileUpload';
import { Avatar } from '@material-tailwind/react';
import { capitalFirstLetter } from '@/utils/textModify';
import Loading from '@/utils/Loading';

function Profile() {
  const { getCurrentUser } = useUserLibrary(useAuth().currentUser?.uid);
  const { currentUser } = useAuth();
  const { file, downloadURL, handleButtonClick, imageLoading, handleDelete } =
    useFileUpload();

  console.log(downloadURL);

  const resAvatar = () => {
    let avatar = downloadURL;

    if (getCurrentUser?.imageUrl !== null) {
      return <Avatar src={getCurrentUser?.imageUrl} />;
    } else if (avatar !== null) {
      return <Avatar src={avatar} />;
    } else {
      return capitalFirstLetter(getCurrentUser?.displayName);
    }
  };
  const handleAvatar = () => {
    handleButtonClick();
  };
  const customImage =
    'https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';
  return (
    <>
      <div className='mx-auto max-w-7xl  pb-4  flex flex-col justify-center h-[94vh] items-center bg-blue-gray-900 relative'>
        <div
          style={{
            backgroundImage: `url(${
              getCurrentUser?.backgroundImageUrl
                ? getCurrentUser.backgroundImageUrl
                : customImage
            })`,
          }}
          className='absolute top-0 imgContainer h-[50vh]  w-full rounded-xl bg-cover bg-center'></div>

        <Card className='flex mt-16 lg:mx-4 items-center justify-center  shadow-sm shadow-white max-w-xl  w-[95%]  md:min-h-[50%]  backdrop-blur-xl bg-white/70 '>
          <CardBody className='w-full min-h-full'>
            <div className='mb-10 flex items-center justify-between gap-6 flex-wrap'>
              <div className='flex items-center gap-6 '>
                <Tooltip content='change avatar image'>
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <button onClick={handleAvatar}>{resAvatar()}</button>
                  )}
                </Tooltip>

                <div>
                  <Typography variant='h5' color='blue-gray' className='mb-1'>
                    {getCurrentUser?.displayName || currentUser?.displayName}
                  </Typography>
                </div>
              </div>
            </div>
            {Settings()}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default Profile;
