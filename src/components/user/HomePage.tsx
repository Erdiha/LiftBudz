import React, { useCallback, useEffect } from 'react';
import useAuth, { useUserLibrary } from '../../firebase/firebaseUI';
import { useState } from 'react';
import Link from 'next/link';

const Homepage: React.FC = () => {
  const { currentUser, logIn, logout, Register, isLoading } = useAuth();

  const inf: any = useUserLibrary(currentUser?.uid);

  console.log(currentUser, inf);
  return (
    <div className="bg-gray-300 min-h-screen w-full mt-20 p-10 ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="md:w-1/4 border-4 border-indigo-600">
            <img src="/fittness.svg" className="h-32 mx-auto" alt="Avatar" />
            <p className="text-center font-medium">{currentUser?.email}</p>
            <hr className="text-black border-2 border-black" />
            <div className="mt-4 gap-4 grid grid-rows-auto p-1">
              <Link href="/profile" className="block text-center font-medium">
                Profile
              </Link>
              <a href="#" className="block text-center font-medium">
                Messages
              </a>
              <a href="#" className="block text-center font-medium">
                Progress
              </a>
              <a href="#" className="block text-center font-medium">
                Friends
              </a>
            </div>
          </div>
          <div className="md:w-3/4 overflow-y-auto ">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-2">Recent Posts</h2>
              <div className="mb-4">
                <p>Post 1</p>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                New Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
