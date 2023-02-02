import { Fragment, useState, useMemo, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useAuth from '@/firebase/usefirebaseUI';
import Link from 'next/link';
import { Search } from '@/components/search/Search';
import { useUserLibrary } from '../../firebase/usefirebaseUI';
import Avatar from 'avataaars';
import { useGetAvatar } from '@/hooks/useFetch';
const user = {
  name: 'Name',
  email: 'name@example.com',
  imageUrl: '/icon.png',
};

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function NavbarComponent() {
  const { currentUser, logout } = useAuth();
  const { getCurrentUser } = useUserLibrary(useAuth().currentUser?.uid);
  const getAvatar = useGetAvatar();

  useEffect(() => {
    !currentUser && logout();
  }, []);

  const userNavigation = [
    { name: 'Your Profile', href: '/Profile' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/' },
  ];
  const [navigation, setNavigation] = useState([
    { name: 'Dashboard', href: '/', current: false },
  ]);
  const handleNavItemsclicked = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;

    const updatedNavigation = navigation.map((item) => {
      return {
        ...item,
        current: item.name === element.innerHTML,
      };
    });
    setNavigation(updatedNavigation);
  };
  const handleSearch = (value: string) => {
    //console.log(`Searching for ${value}`);
  };
  console.log(getCurrentUser);
  return (
    <>
      <div className="fixed min-w-full z-[9999] ">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gray-50  flex justify-center items-center p-1 px-2 rounded shadow-blue-300 shadow-sm ">
                      LIFTBudz
                      {/* <img
                        className="h-8 w-8  absolute z-[1]"
                        src="/fittness.svg"
                        alt="icon"
                      /> */}
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                              handleNavItemsclicked(e)
                            }
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium',
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6 gap-6">
                      <Search placeholder="Search..." onSearch={handleSearch} />
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3 z-50">
                        <div>
                          {currentUser ? (
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-1">
                              <span className="sr-only">Open user menu</span>
                              <Avatar
                                avatarStyle="Circle"
                                style={{ width: '40px', height: '40px' }}
                                {...getAvatar}
                              />
                            </Menu.Button>
                          ) : (
                            <Link
                              href="/signin"
                              className={
                                'bg-gray-100block px-4 py-2 text-sm text-gray-100'
                              }
                            >
                              Log In{' '}
                            </Link>
                          )}
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0  mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    onClick={() =>
                                      item.name === 'Sign out' && logout()
                                    }
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden ">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Avatar
                        avatarStyle="Circle"
                        style={{ width: '40px', height: '40px' }}
                        {...getAvatar}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2 ">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
