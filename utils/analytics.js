// utils/analytics.js
<<<<<<< HEAD
export const initGA = (trackingID) => {
  if (window && window.gtag) {
    window.gtag('config', trackingID, {
      page_path: window.location.pathname,
    });
  }
};

export const logPageView = () => {
  if (window && window.gtag) {
    window.gtag('config', 'G-EX29TSBZEZ', {
      page_path: window.location.pathname,
    });
  }
=======
import ReactGA from 'react-ga';

export const initGA = (trackingID) => {
  ReactGA.initialize(trackingID);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
>>>>>>> 03a5e2a0ac3e3b7d4f58eac2e3145fb438dcd4a4
};
