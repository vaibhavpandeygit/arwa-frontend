'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/styles/theme/components/spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        const isValid = true;

        if (isValid) {
          setIsAuthenticated(true);
          return;
        }
      }

      setIsAuthenticated(false);
      router.push('/auth/sign-in'); 
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <Spinner message='Please wait . . .'/>;
  }

  return <>{children}</>;
};
