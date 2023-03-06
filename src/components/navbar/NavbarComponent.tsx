import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/firebase/usefirebaseUI';
import { auth } from '@/firebase/firebase';
import Link from 'next/link';

const Navbar = () => {
  const dDownRef: any = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  const router = useRouter();

  useEffect(() => {
    setShowDropdown(false);
  }, [router.asPath]);

  console.log(router);

  return (
    <nav className='flex justify-center items-center bg-gray-900 fixed w-screen z-[9999] p-3  md:p-0'>
      <div className='flex items-center justify-between flex-wrap max-w-7xl w-full'>
        <div className='flex items-center flex-shrink-0 text-white'>
          <Link href='/' className='font-semibold text-xl tracking-tight p-2'>
            <h1 className='text-3xl font-bold'>
              <span className='text-blue-400'>LIFT</span>
              <span className='text-gray-200'>Budz</span>
            </h1>
          </Link>
        </div>
        <div className='block md:hidden '>
          <button
            className='flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white transform-all ease-in-out duration-300'
            onClick={() => setShowDropdown(!showDropdown)}>
            <svg
              className='fill-current h-3 w-3'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>

        <div
          ref={dDownRef}
          className={`w-full flex-grow md:flex md:items-center md:w-auto bg-gray-900 justify-between py-4 ${
            showDropdown ? 'block ' : 'hidden'
          }  p-2 py-4`}>
          <div className='text-md md:flex-grow  md:p-0  md:text-xl md:flex md:justify-center md:gap-10 py-4'>
            <Link
              href='/'
              onClick={() => router.push('/')}
              className={` ${
                router.asPath === '/'
                  ? 'md:border-b-4 md:border-blue-400 md:backdrop-blur gradient text-gray-200 '
                  : 'bg-transparent backdrop-blur-0 text-gray-200'
              } block mt-4 md:inline-block md:mt-0 text-gray-200 hover:text-white mr-4 md:p-2 py-2 rounded`}>
              Home
            </Link>
            {auth?.currentUser && (
              <Link
                href='/Profile'
                onClick={() => router.push('/Profile')}
                className={` ${
                  router.asPath === '/Profile'
                    ? 'md:border-b-4 md:border-blue-400 md:backdrop-blur gradient text-gray-200 '
                    : 'bg-transparent backdrop-blur-0 text-gray-200'
                } block mt-4 md:inline-block md:mt-0  hover:text-white mr-4 md:p-2 py-2  rounded`}>
                Profile
              </Link>
            )}
          </div>
          <div className='flex '>
            {auth?.currentUser ? (
              <button
                className='text-white flex hover:text-gray-400 focus:outline-none ring-1 ring-gray-100 items-center mr-6 md:hover:bg-gray-400 rounded p-2 md:hover:text-black justify-center'
                onClick={handleLogout}>
                LOGOUT
              </button>
            ) : (
              <button
                className='text-white flex hover:text-gray-400 focus:outline-none ring-1 ring-gray-100 items-center mr-6 md:hover:bg-gray-400 rounded p-2 md:hover:text-black justify-center'
                onClick={() => router.push('/signin')}>
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
