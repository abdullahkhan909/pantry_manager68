// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initGA, logPageView } from '../utils/analytics'; // Adjust the path as necessary

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA('G-XXXXXXXXXX'); // Replace with your Google Analytics tracking ID
      window.GA_INITIALIZED = true;
    }
    logPageView();
    router.events.on('routeChangeComplete', logPageView);
    return () => {
      router.events.off('routeChangeComplete', logPageView);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
