import React, { useState } from 'react';
import useAuth, { Iinput } from '@/firebase/usefirebaseUI';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@material-tailwind/react';

function signin() {
  const [userLogin, setUserLogin] = useState(false);
  const [demo, setDemo] = useState(false);
  const { logIn, Register, isLoading } = useAuth();
  const [signup, setSignup] = useState(true);

  //react hook form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iinput>();

  //when the user clicked button to login, do auth
  const onSubmit: SubmitHandler<Iinput> = async (data: any) => {
    if (demo) {
      data.displayName = 'Guest';
      data.email = 'demo@demo.com';
      data.password = '123456';
      await logIn(data.email, data.password);
    } else {
      signup && !demo
        ? await Register(data.displayName, data.email, data.password)
        : await logIn(data.email, data.password);
    }
  };

  return (
    <div className='lg:flex flex justify-center items-center max-w-7xl m-auto h-[94vh] max-h-screen '>
      <>
        <div className='lg:w-1/2 xl:max-w-screen-sm relative '>
          <div className=' p-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl lg:border-r-[1px] lg:border-black'>
            <h2
              className='text-center text-4xl text-blue-400 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold'>
              {`${signup ? 'Sign Up' : 'Sign In'}`}
            </h2>
            <div className='mt-12 '>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    id='name'
                    {...register('displayName')}
                    type='text'
                    color='indigo'
                    size='lg'
                    label='Name (optional)'
                    name='displayName'
                  />
                </div>
                <div className='mt-8'>
                  <Input
                    id='email'
                    {...register('email')}
                    type='email'
                    required
                    color='indigo'
                    size='lg'
                    label='Email Address'
                    name='email'
                  />
                </div>
                <div className='mt-8'>
                  <Input
                    id='password'
                    {...register('password')}
                    type='password'
                    required
                    color='indigo'
                    size='lg'
                    label='Enter your password'
                    name='password'
                  />
                </div>
                <div className='mt-10'>
                  <button
                    onClick={() => {
                      setUserLogin(true);
                    }}
                    type='submit'
                    className='bg-blue-400 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg'>
                    {`${signup ? 'Register' : 'Log In'}`}
                  </button>
                </div>
              </form>
              <div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
                {`${
                  signup ? 'Already Registered ? ' : ' Dont have an account ? '
                }`}
                <button
                  onClick={() => setSignup((prev) => !prev)}
                  className='cursor-pointer text-blue-400 hover:text-indigo-800'>
                  {`${signup ? 'Sign In' : 'Sign Up'}`}
                </button>
              </div>
            </div>
          </div>
          <div className='w-full  px-10  flex flex-col md:mt-20 justify-center items-center gap-8'>
            <p className='text-center font-extrabold underline'>OR</p>
            <form action='' className='z-50' onSubmit={handleSubmit(onSubmit)}>
              <button
                type='submit'
                onClick={() => {
                  setDemo(true);
                  setUserLogin(false);
                }}
                className='bg-blue-400 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg'>
                TRY
              </button>
            </form>
          </div>
        </div>
        <div className='rounded p-3  hidden lg:flex items-center justify-center flex-1 flex-col gap-4 drop-shadow-md text-black'>
          <div className='max-w-xs transform duration-200 hover:scale-110 cursor-pointer shadow-sm shadow-white rounded-full'>
            <div className={`bg-black/60 p-4 rounded-full `}>
              <svg
                className='w-full h-full'
                viewBox='0 0 100 100'
                xmlns='http://www.w3.org/2000/svg'>
                <image xlinkHref='/fittness.svg' width='100' height='100' />
              </svg>
            </div>
          </div>
          <p
            // target='_blank'
            // rel='noopener noreferrer'
            className='  flex text-black rounded p-1 shadow-text-sm'
            // href='https://www.betterhealth.vic.gov.au/health/healthyliving/Exercise-with-a-friend'
          >
            <p className='text-sm font-semibold'>Exercise</p>
          </p>
        </div>
      </>
    </div>
  );
}

export default signin;
