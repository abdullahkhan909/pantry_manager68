import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initGA, logPageView } from '../utils/analytics'; // Ensure this path is correct
import { AuthProvider } from '../components/auth'; // Ensure this path is correct
import '../styles/globals.css'; // Import global CSS here

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      try {
        initGA('G-EX29TSBZEZ'); // Replace with your Google Analytics tracking ID
        window.GA_INITIALIZED = true;
      } catch (error) {
        console.error('Error initializing Google Analytics:', error);
      }
    }

    const handleRouteChange = (url) => {
      try {
        if (typeof logPageView === 'function') {
          logPageView();
        } else {
          console.warn('logPageView is not a function');
        }
      } catch (error) {
        console.error('Error logging page view:', error);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
