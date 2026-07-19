'use client';

import {useEffect} from 'react';
import {useAuth} from '@/components/auth/AuthContext';
import {useRouter, usePathname} from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isAuthenticated, isAdmin} = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="flex min-h-[calc(100vh-300px)] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">🔒</div>
          <p className="text-gray-600">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
