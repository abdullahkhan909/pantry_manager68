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
<<<<<<< HEAD
      initGA('G-EX29TSBZEZ'); // Replace with your Google Analytics tracking ID
=======
      initGA('G-XXXXXXXXXX'); // Replace with your Google Analytics tracking ID
>>>>>>> 03a5e2a0ac3e3b7d4f58eac2e3145fb438dcd4a4
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
