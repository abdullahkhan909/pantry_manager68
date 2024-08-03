// utils/analytics.js
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
};
