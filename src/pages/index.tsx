import Head from 'next/head';
import Hero from '@/components/mainpage/Hero';
import { CiDumbbell } from 'react-icons/ci';
import style from '@/styles/Home.module.css';
import MainSegments from '../components/mainpage/MainSegments';
import axios from 'axios';
import { IPexelImages } from './types';
import useAuth from '@/firebase/firebaseUI';
import HomePage from '@/components/user/HomePage';

export async function getServerSideProps() {
  const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API;

  const res = await axios.get(
    `https://api.pexels.com/v1/search?query=gym&per_page=3`,
    {
      headers: {
        Authorization: `Bearer ${PEXELS_API_KEY}`,
      },
    }
  );
  const data = res.data;
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }: IPexelImages) {
  const { isLoading, currentUser } = useAuth();

  return (
    <>
      <Head>
        <title>LIFTBudz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/icon.png" rel="icon" />
      </Head>

      <main className={style.main}>
        {currentUser ? (
          <HomePage />
        ) : (
          <>
            <Hero />
            <MainSegments {...{ data }} />
          </>
        )}
      </main>
    </>
  );
}

//pexel_api=563492ad6f917000010000013ebd2d22f5394e1d9a06670fddcfba7a
