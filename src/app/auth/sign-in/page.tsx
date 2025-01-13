'use client'

import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { Layout } from '@/components/auth/layout';
import { useUser } from '@/contexts/user-context';
import { useRouter } from 'next/navigation';
import SignInForm from '@/components/auth/sign-in-form';
import { GuestGuard } from '@/components/auth/guest-gaurd';

// export const metadata = { title: `Sign in | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {


  return (
    <Layout>
      <GuestGuard>
        <SignInForm />
      </GuestGuard>
    </Layout>
  );
}
