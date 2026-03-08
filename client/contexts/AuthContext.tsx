import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPartner, setIsPartner] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // For demo purposes, set partner status based on email or some logic
      // In a real app, this would come from Firestore or user claims
      setIsPartner(user && user.email?.includes('partner'));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updatePartnerStatus = (status) => {
    setIsPartner(status);
  };

  const value = {
    user,
    loading,
    isPartner,
    updatePartnerStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};