import React from 'react';
import { Button, Input } from '@material-tailwind/react';
import UserCard from '../user/UserCard';
import { useGetUsers } from '../data';
import useAuth from '@/firebase/usefirebaseUI';
import Loading from '@/utils/Loading';

function Friends({ activeTab, setActiveTab, setOpenSideBar }: any) {
  const { currentUser } = useAuth();
  const { users, loading, error } = useGetUsers(currentUser?.email, 'friends');
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredUsers = users?.filter((item: any) =>
    item?.displayName.toLowerCase().includes(searchTerm?.toLowerCase()),
  );

  return (
    <div className='w-full mt-[5rem] flex flex-col'>
      <div className='w-full flex flex-col gap-2 p-1'>
        <div className='flex gap-2 p-1 w-full'>
          <Button
            onClick={() => {
              setOpenSideBar((prev: boolean) => !prev);
            }}
            className='w-full tracking-widest md:w-[25%]'>
            MENU
          </Button>
          <Button
            onClick={() => setOpenSearch(!openSearch)}
            className={`w-full tracking-widest transition duration-500 ${
              openSearch ? 'bg-red-500' : 'bg-blue-500'
            }`}>
            {openSearch ? 'CLOSE' : 'SEARCH'}
          </Button>
        </div>
        <div className={`w-full p-2 ${openSearch ? 'block' : 'hidden'}`}>
          <form>
            <Input
              onChange={(e) => setSearchTerm(e?.target?.value)}
              label='user name...'
            />
          </form>
        </div>
      </div>
      <div className='scroll-y-auto overflow-y-auto'>
        <div
          className={`w-full justify-center items-center bg-gray-100 text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10`}>
          {loading ? (
            <Loading />
          ) : (
            filteredUsers?.map((user: any, index: number) => (
              <div key={index} className='flex flex-col gap-2'>
                <UserCard {...user} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Friends;
