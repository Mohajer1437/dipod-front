'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const jwt_decode = require('jwt-decode');

interface DecodedToken {
  id: number;
  role: 'admin' | 'customer';
  exp: number;
  iat: number;
}

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded: DecodedToken = jwt_decode(token);
      setRole(decoded.role);
    } catch (err) {
      console.error('Invalid token', err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>در حال بررسی دسترسی...</div>;

  return <>{children}</>;
}
