import NavbarComponent from '@/components/navbar/NavbarComponent';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/firebase/usefirebaseUI';
import { RecoilRoot } from 'recoil';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/reducers/usersReducer';

const store = configureStore({ reducer: usersReducer });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {' '}
      <AuthProvider>
        <Provider store={store}>
          <NavbarComponent />
          <Component {...pageProps} />
        </Provider>
      </AuthProvider>
    </>
  );
}
