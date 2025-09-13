'use client';

import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { ReactNode, useEffect } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      redirect('/dashboard');
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}