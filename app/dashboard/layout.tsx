'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as jwt_decode from 'jwt-decode';

interface DecodedToken {
  id: number;
  role: 'admin' | 'customer';
  exp: number;
  iat: number;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = (jwt_decode as any)(token) as DecodedToken;
      // فقط بررسی می‌کنیم که token معتبر باشد
      if (!decoded || (decoded.role !== 'customer' && decoded.role !== 'admin')) {
        router.push('/login');
      }
    } catch {
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>در حال بررسی دسترسی...</div>;

  return <>{children}</>;
}
