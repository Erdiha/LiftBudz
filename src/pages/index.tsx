import Head from 'next/head';
import Hero from '@/components/mainpage/Hero';
import { CiDumbbell } from 'react-icons/ci';
import style from '@/styles/Home.module.css';
import MainSegments from '../components/mainpage/MainSegments';
import { IPexelImages } from './types';
import useAuth from '@/firebase/usefirebaseUI';
import Dashboard from '@/pages/Dashboard';

export async function getServerSideProps() {
  const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=gym&per_page=3`,
      {
        headers: { Authorization: `Bearer ${PEXELS_API_KEY}` },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data, status: ${res.status}`);
    }
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}
export default function Home({ data }: IPexelImages) {
  const { isLoading, currentUser } = useAuth();

  return (
    <>
      <Head>
        <title>LIFTBudz</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <main className={style.main}>
        {currentUser ? (
          <div className='w-screen h-screen flex justify-center items-center '>
            <Dashboard />
          </div>
        ) : (
          <>
            {/* <Hero /> */}
            {/* <MainSegments {...{ data }} /> */}
          </>
        )}
      </main>
    </>
  );
}
