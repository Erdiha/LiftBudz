import NavbarComponent from '@/components/NavbarComponent';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <NavbarComponent />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
