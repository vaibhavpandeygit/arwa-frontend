'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/styles/theme/components/spinner';

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const router = useRouter();
  const [isGuest, setIsGuest] = useState<boolean | null>(null);

  useEffect(() => {
    const checkGuest = async () => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        // If the user is logged in, redirect to the dashboard
        router.push('/dashboard');
        setIsGuest(false);
        return;
      }

      // Allow rendering the children if the user is not logged in
      setIsGuest(true);
    };

    checkGuest();
  }, [router]);

  // Prevent rendering children until the guest status is determined
  if (isGuest === null) {
    return <Spinner/>;
  }

  return <>{children}</>;
};
