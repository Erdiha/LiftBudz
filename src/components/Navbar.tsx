import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useCallback, useEffect, useState, useRef } from 'react';

interface ILink {
  pathname: string;
  title: string;
}

const Navigation = () => {
  // const [activeLink, setActiveLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  // const [screenWidth, setScreenWidth] = useState(typeof window!=='undefined'? window.innerWidth:0);
  const navRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleResize = () => setScreenWidth(window.innerWidth);
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (screenWidth >= 768) {
  //     setIsOpen(false);
  //   }
  // }, [screenWidth]);

  const navLinks: ILink[] = [
    { pathname: '/about', title: 'About' },
    { pathname: '/contact', title: 'Contact' },
    { pathname: '/account', title: 'Account' },
  ];

  const handleLinkClick = useCallback((pathname: string) => {
    setActiveLink(pathname);
    setIsOpen(false);
  }, []);

  return (
    <div>
      <nav className="bg-gray-800 ">
        <div className="container mx-auto flex flex-wrap items-center justify-center">
          <div className="flex items-center justify-between h-16 w-[90%]">
            <div className="flex justify-between items-center w-[100%]">
              <div
                onClick={() => handleLinkClick('/')}
                className="flex-shrink-0 text-white"
              >
                <Link href="/">
                  <span className="text-lg font-medium">LiftBudz</span>
                </Link>
              </div>
              <div className="hidden md:block ">
                <div className="ml-10 flex space-x-4">
                  {navLinks.map((link) => (
                    <Link href={link.pathname} as={link.pathname}>
                      <span
                        onClick={() => handleLinkClick(link.pathname)}
                        className={` ${
                          activeLink === link.pathname
                            ? 'bg-gray-400'
                            : isOpen
                            ? 'bg-gray-800'
                            : 'hover:bg-gray-800'
                        } hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        {link.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-[200] transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-[150] transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div
              className="md:hidden transform-all ease-in-out duration-300 "
              id="mobile-menu"
            >
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <Link href={link.pathname} as={link.pathname}>
                    <span
                      onClick={() => handleLinkClick(link.pathname)}
                      className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};

export default Navigation;
