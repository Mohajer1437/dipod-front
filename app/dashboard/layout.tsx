'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await res.json();

        if (!data.authenticated || !data.user) {
          router.replace('/login');
          return;
        }

        if (!['admin', 'customer'].includes(data.user.role)) {
          router.replace('/login');
          return;
        }

        setUserRole(data.user.role);
      } catch {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) return <div className="p-5 text-center">در حال بررسی دسترسی...</div>;

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          'radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,.14), transparent 60%), radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,.15), transparent 60%), #0b0b12',
      }}
    >
      <main className="p-6">{children}</main>
    </div>
  );
}
