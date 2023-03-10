import { Button, Input } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import Loading from '@/utils/Loading';
import useAuth from '@/firebase/usefirebaseUI';
import { auth } from '@/firebase/firebase';
import Link from 'next/link';

export default function SelectRecipient({
  sendMessageToUser,
  setMessageUserId,
  setSendMessageToUser,
  users,
  loading,
  error,
}: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers]: any = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    setFilteredUsers(
      users?.filter((user: any) =>
        user?.displayName.toLowerCase().includes(searchTerm?.toLowerCase()),
      ),
    );
  }, [searchTerm]);

  if (error) {
    console.log(error);
  }
  console.log('this is users in selectrecipient', filteredUsers, users);
  return (
    <div className='flex flex-col relative  h-full justify-center items-center p-8'>
      <Link
        href='../'
        onClick={() => setSendMessageToUser((prev: boolean) => !prev)}
        className='absolute top-2 right-2'>
        <Button> Cancel</Button>
      </Link>
      <div className='mb-3 xl:w-96 w-[50%] '>
        <Input
          type='search'
          className='form-control block w-full px-3 py-1.5
			            text-base
			            font-normal
			            text-gray-700
			            bg-white bg-clip-padding 
			            border border-solid border-gray-300 
			            rounded 
			            transition 
			            ease-in-out m-0
			            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          id='exampleSearch'
          label='Type A Name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='h-full w-full flex flex-col gap-1 items-center'>
          {(filteredUsers ? filteredUsers : users).map((user: any) => {
            return (
              user?.email !== auth?.currentUser?.email && (
                <button
                  className='bg-gray-200 shadow-md  w-[45%] p-1 md:hover:scale-x-105  rounded md:hover:bg-blue-gray-50'
                  onClick={() => {
                    setSendMessageToUser(true), setMessageUserId(user.email);
                  }}
                  key={user.id}>
                  {user.displayName}
                </button>
              )
            );
          })}
        </div>
      )}
    </div>
  );
}
