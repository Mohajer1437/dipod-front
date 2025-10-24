'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as jwtDecode from 'jwt-decode';

interface DecodedToken {
  id: number;
  role: 'admin' | 'customer';
  exp: number;
  iat: number;
}

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = (jwtDecode as unknown as (token: string) => { id: number; username: string; role: 'admin' | 'customer' })(token);
      if (decoded.role !== 'admin') {
        router.push('/dashboard');
      }
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>در حال بررسی دسترسی...</div>;

  return <>{children}</>;
}
