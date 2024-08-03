// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initGA, logPageView } from '../utils/analytics'; // Adjust the path as necessary
import { AuthProvider } from '../components/auth'; // Adjust the import path as needed
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA('G-EX29TSBZEZ'); // Replace with your Google Analytics tracking ID
      window.GA_INITIALIZED = true;
    }
    logPageView();
    router.events.on('routeChangeComplete', logPageView);
    return () => {
      router.events.off('routeChangeComplete', logPageView);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
