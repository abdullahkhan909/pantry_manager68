// components/auth.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase'; // Adjust the import path as needed
import { onAuthStateChanged } from 'firebase/auth';

// Create a context for authentication
const AuthContext = createContext(null);

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
