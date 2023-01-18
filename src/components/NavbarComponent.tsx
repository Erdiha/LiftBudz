import { useState, useEffect, ReactNode, useCallback } from 'react';
import populateJSX from '../utils/populateJSX';
import { GiGymBag } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import Link from 'next/link';
import useAuth from '@/firebase/firebaseUI';
interface ILink {
  pathname: string;
  title: string;
}
export default function NavbarComponent() {
  const [openNav, setOpenNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { isLoading, currentUser } = useAuth();

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navLinks: ILink[] = [
    { pathname: '/', title: 'Home' },
    { pathname: '/contact', title: 'Contact' },
    { pathname: '/profile', title: 'Profile' },
  ];

  const handleLinkClick = useCallback((pathname: string) => {
    setActiveLink(pathname);
    setIsOpen(false);
  }, []);

  function populateJSX(howMany: number) {
    const store: ReactNode[] = [];
    const listNames: string[] = [''];
    for (let f = 0; f < howMany; f++) {
      store.push(
        <Typography
          onClick={() => handleLinkClick(navLinks[f].pathname)}
          key={f}
          as="li"
          variant="small"
          color="white"
          className={` 
          ${activeLink === navLinks[f].pathname && 'bg-gray-500/50'} 
          ${
            currentUser
              ? 'md:w-[12rem]  items-center md:flex justify-center'
              : 'w-[3.5rem]'
          }
            p-2 font-normal hover:bg-gray-500/50 rounded-md transition-all duration-300 ease-in-out`}
        >
          <a href={navLinks[f].pathname} className="flex items-center">
            {navLinks[f].title}
          </a>
        </Typography>
      );
    }
    return store;
  }

  return (
    <div className="z-50 block w-full py-4 px-8 shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 text-white lg:py-4  bg-black rounded-none ">
      <div className="flex items-center justify-between  border-none">
        <Typography
          onClick={() => setActiveLink('/')}
          as="a"
          href="/"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          {/* <img className="bg-white text-red-600 " src="/icon.png" /> */}
          <div className="flex">
            {' '}
            <GiGymBag className="p-1 bg-white text-black text-3xl rounded-full" />
            <span className="font-semibold  text-2xl">LiftBudz</span>
          </div>
        </Typography>
        <div className="hidden lg:block">
          <ul
            className={`
          
          mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6`}
          >
            {populateJSX(3)}
          </ul>
        </div>
        {!currentUser && (
          <Link href="/signin">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span className="p-[3px]  h-full">Sign Up </span>{' '}
              <span className=" border-l-[1px] p-[3px] pl-[5px] border-black h-full">
                Sign In{' '}
              </span>
            </Button>
          </Link>
        )}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {populateJSX(3)}
        {!currentUser && (
          <Link href="/signin">
            <Button
              color="indigo"
              variant="gradient"
              size="md"
              fullWidth
              className="mb-2 bg-indigo-400"
            >
              <span className="p-[3px]  h-full">Sign Up </span>{' '}
              <span className=" border-l-[1px] p-[3px] pl-[5px] border-black h-full">
                Sign In{' '}
              </span>
            </Button>
          </Link>
        )}
      </MobileNav>
    </div>
  );
}
