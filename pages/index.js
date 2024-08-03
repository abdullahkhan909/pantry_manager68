import React from 'react';
import { useRouter } from 'next/router';

function HomePage() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome To Your Pantry Items</h1>
        <div style={styles.buttonContainer}>
          <button onClick={() => navigateTo('/login')} style={styles.navButton}>Login</button>
          <button onClick={() => navigateTo('/signUp')} style={styles.navButton}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'url(/pantry.jpg) no-repeat center center fixed',
    backgroundSize: 'cover',
    padding: '20px',
    color: '#fff',
  },
  content: {
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for better text visibility
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '500px',
    transition: 'transform 0.2s ease',
  },
  title: {
    marginBottom: '20px',
    fontSize: '36px',
    fontWeight: '700',
  },
  buttonContainer: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  navButton: {
    margin: '10px',
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  // Media queries for mobile responsiveness
  '@media (max-width: 600px)': {
    title: {
      fontSize: '28px',
    },
    navButton: {
      margin: '5px',
      padding: '8px 16px',
      fontSize: '14px',
    },
  },
};

export default HomePage;
