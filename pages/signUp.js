import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../components/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Successfully signed up!');
      setIsSuccess(true);
      setTimeout(() => {
        setMessage('');
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error('Error signing up: ', error);
      setMessage('Failed to sign up. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div style={styles.container}>
      {message && (
        <div style={{ ...styles.message, backgroundColor: isSuccess ? '#4CAF50' : '#f44336' }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSignup} style={styles.form}>
        <h2 style={styles.heading}>Create an Account</h2>
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
        <button type="submit" style={styles.submitButton}>Sign Up</button>
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
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center'
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
    .heading {
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

export default SignUp;
