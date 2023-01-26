import NavbarComponent from '@/components/navbar/NavbarComponent';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/firebase/usefirebaseUI';
import { RecoilRoot } from 'recoil';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {' '}
      <AuthProvider>
        <RecoilRoot>
          <NavbarComponent />
          <Component {...pageProps} />
        </RecoilRoot>
      </AuthProvider>
    </>
  );
}
