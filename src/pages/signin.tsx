import React, { useState } from 'react';
import useAuth, { IRegister, Iinput } from '@/firebase/firebaseUI';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@material-tailwind/react';

interface Props {
  imageUrl: string;
}

function Signin_signup() {
  const [userLogin, setUserLogin] = useState(false);
  const [demo, setDemo] = useState(false);
  const { logIn, Register } = useAuth();
  const [signup, setSignup] = useState(false);

  //react hook form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iinput>();

  //when the user clicked button to login, do auth
  const onSubmit: SubmitHandler<Iinput> = async (data: any) => {
    if (demo) {
      data.name = 'Guest';
      data.email = 'demo@demo.com';
      data.password = '123456';
    }
    //if user has account login else register
    signup
      ? await Register(data.email, data.password)
      : await logIn(data.email, data.password);
  };

  return (
    <div className="lg:flex py-10 flex justify-center items-center">
      <div className="lg:w-1/2 xl:max-w-screen-sm relative">
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            {`${signup ? 'Sign Up' : 'Sign In'}`}
          </h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input color="indigo" size="lg" label="Name (optional)" />
              </div>
              <div className="mt-8">
                <Input
                  {...register('email')}
                  type="email"
                  required
                  color="indigo"
                  size="lg"
                  label="Email Address"
                />
              </div>
              <div className="mt-8">
                <Input
                  {...register('password')}
                  type="password"
                  required
                  color="indigo"
                  size="lg"
                  label="Enter your password"
                />
              </div>
              <div className="mt-10">
                <button
                  onClick={() => {
                    setDemo(true);
                    setUserLogin(true);
                  }}
                  type="submit"
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                >
                  {`${signup ? 'Register' : 'Log In'}`}
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              {`${
                signup ? 'Already Registered ? ' : ' Dont have an account ? '
              }`}
              <button
                onClick={() => setSignup((prev) => !prev)}
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                {`${signup ? 'Sign In' : 'Sign Up'}`}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[20rem] p-10  grid grid-rows-[1fr,5fr] mt-20 justify-center items-center">
          <p className="text-center font-extrabold underline">OR</p>
          <form action="" className="z-50" onSubmit={handleSubmit(onSubmit)}>
            <button
              type="submit"
              onClick={() => {
                setDemo(true);
                setUserLogin(true);
              }}
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
            >
              TRY
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-indigo-300 flex-1 h-screen flex-col gap-4">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <div className={`bg-black/60 p-4 rounded-full `}>
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image xlinkHref="/fittness.svg" width="100" height="100" />
            </svg>
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold leading-[40px]">
          Still Not Convinced? <br />{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 bg-black rounded p-1"
            href="https://www.betterhealth.vic.gov.au/health/healthyliving/Exercise-with-a-friend"
          >
            Read More...
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Signin_signup;
