import NavbarComponent from '@/components/NavbarComponent';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import { AuthProvider } from '@/firebase/firebaseUI';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {' '}
      <AuthProvider>
        <NavbarComponent />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
