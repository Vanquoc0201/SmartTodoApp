'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return <>{children}</>;
}