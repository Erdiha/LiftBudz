import React from 'react';
import useAuth from '@/firebase/usefirebaseUI';
import { Card, CardBody, Typography, Tooltip } from '@material-tailwind/react';
import { useUserLibrary } from '../firebase/usefirebaseUI';
import { Settings } from '@/components/profile/EditProfile';
import useFileUpload from '../hooks/useFileUpload';
import { Avatar } from '@material-tailwind/react';
import { capitalFirstLetter } from '@/utils/textModify';
import Loading from '@/utils/Loading';

function profile() {
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

  return (
    <>
      <div className='mx-auto max-w-7xl  pb-4  flex flex-col justify-center h-screen items-center bg-blue-gray-900 relative'>
        <div
          style={{
            backgroundImage: `url(${
              getCurrentUser?.backgroundImageUrl
                ? getCurrentUser.backgroundImageUrl
                : '/profile.jpg'
            })`,
          }}
          className='absolute top-0 imgContainer h-[50vh]  w-full rounded-xl bg-cover bg-center'></div>

        <Card className='flex mt-16 lg:mx-4 items-center justify-center  shadow-sm shadow-white max-w-xl  w-[95%]  md:min-h-fit backdrop-blur-xl bg-white/70 '>
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
                    {getCurrentUser?.displayName
                      ? getCurrentUser?.displayName || currentUser?.displayName
                      : 'N/A'}
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
export default profile;
