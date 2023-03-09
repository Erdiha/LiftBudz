import Head from 'next/head';
import Hero from '../components/mainpage/Hero';
import MainSegments from '../components/mainpage/MainSegments';
import useAuth from '@/firebase/usefirebaseUI';
import Dashboard from './Dashboard';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <>
      <Head>
        <title>LIFTBudz</title>
        <meta
          name='description'
          content='LIFTBudz is a fitness website that provides workout plans, nutrition tips, and exercise videos for people of all fitness levels.'
        />

        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <main className='flex flex-col justify-between items-center scroll-smooth box-border'>
        {currentUser ? (
          <div className='w-screen h-screen flex justify-center items-center '>
            <Dashboard />
          </div>
        ) : (
          <>
            <Hero />
            <MainSegments />
          </>
        )}
      </main>
    </>
  );
}
