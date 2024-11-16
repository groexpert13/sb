import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: (accountType: 'personal' | 'institution') => Promise<void>;
  signInWithEmail: (email: string, password: string, type?: string) => Promise<string>;
  registerWithEmail: (data: RegistrationData) => Promise<void>;
  logout: () => Promise<void>;
}

interface RegistrationData {
  email: string;
  password: string;
  fullName?: string;
  companyName?: string;
  accountType: 'personal' | 'institution';
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async (accountType: 'personal' | 'institution') => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          fullName: result.user.displayName,
          accountType,
          createdAt: new Date().toISOString()
        });
      }
      
      toast.success('Successfully signed in with Google');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string, type?: string): Promise<string> => {
    try {
      // Special case for demo login with '13sapl'
      if (password === '13sapl') {
        return type || (email.includes('institution') ? 'institution' : 'personal');
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        toast.success('Successfully signed in');
        return userData.accountType;
      }
      
      return type || 'personal';
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const registerWithEmail = async (data: RegistrationData) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userRef = doc(db, 'users', result.user.uid);
      
      await setDoc(userRef, {
        email: data.email,
        fullName: data.fullName,
        companyName: data.companyName,
        accountType: data.accountType,
        createdAt: new Date().toISOString()
      });
      
      toast.success('Successfully registered');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to log out');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};