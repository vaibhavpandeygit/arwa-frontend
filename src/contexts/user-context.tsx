'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';

// Context Value Interface
interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  signOut: () => void; // Add signOut to the context
}

// Create User Context
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Provider Props Interface
interface UserProviderProps {
  children: React.ReactNode;
}

// UserProvider Component
export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const signOut = () => {
    // Clear localStorage and reset states
    localStorage.removeItem('auth-token');
    setUser(null);
    setError(null);
    setIsLoading(false);
    router.push('/auth/sign-in'); // Redirect to login page
  };

  const fetchUser = useCallback(async (): Promise<void> => {
    setIsLoading(true); // Start loading
    setError(null); // Clear any previous error
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('No auth token found');
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/get-details`; // API endpoint
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      console.log('from context', data);
      setUser(data); // Set the user data
      setError(null); // Clear error if any
    } catch (err: any) {
      console.error('[UserContext] Error fetching user:', err);

      if (err.response?.status === 403) {
        // Handle authentication errors (e.g., 403)
        signOut(); // Trigger signOut if authentication fails
      } else {
        setError(err?.response?.data?.message || 'Failed to fetch user details');
        setUser(null); // Ensure user is cleared in case of an error
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  }, [router]);

  // Effect to fetch user on mount
  useEffect(() => {
    fetchUser().catch(() => {
      // Prevent unhandled promise rejections
    });
  }, [fetchUser]);

  // Provide the context value
  return (
    <UserContext.Provider value={{ user, error, isLoading, fetchUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Access the User Context
export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
