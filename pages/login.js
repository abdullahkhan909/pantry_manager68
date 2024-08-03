import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { auth } from '../components/firebase'; // Ensure correct path to firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login successful');
      setIsSuccess(true);
      setTimeout(() => {
        setMessage('');
        router.push('/itemForm'); // Navigate to ItemForm page after successful login
      }, 2000); // Display message for 2 seconds before redirecting
    } catch (error) {
      console.error('Error logging in: ', error);
      if (error.code === 'auth/user-not-found') {
        setMessage('Email not registered');
        setIsSuccess(false);
      } else {
        setMessage('Login failed. Please try again.');
        setIsSuccess(false);
      }
      setTimeout(() => {
        setMessage('');
      }, 2000); // Display message for 2 seconds
    }
  };

  return (
    <div style={styles.container}>
      {message && (
        <div style={{ ...styles.message, backgroundColor: isSuccess ? '#4CAF50' : '#f44336' }}>
          {message}
        </div>
      )}
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '400px',
    backgroundColor: '#fff',
    width: '100%' // Ensuring the form takes full width on mobile
  },
  title: {
    marginBottom: '15px',
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  submitButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%' // Ensuring the button takes full width on mobile
  },
  message: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  }
};

// Adding media queries for better mobile responsiveness
const mobileStyles = `
  @media (max-width: 600px) {
    .container {
      padding: 10px;
    }
    .form {
      padding: 15px;
    }
    .title {
      font-size: 20px;
    }
    .label {
      font-size: 14px;
    }
    .input {
      padding: 6px;
    }
    .submitButton {
      padding: 8px 15px;
      font-size: 14px;
    }
  }
`;

// Injecting mobile styles into the document head
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = mobileStyles;
  document.head.appendChild(styleSheet);
}

export default Login;
