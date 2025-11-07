'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';

export default function Header() {
  const { user, logout, refreshUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const renderUserButton = () => {
    if (user?.role === 'admin') {
      return (
        <div className="flex gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-[#21e1b8]/20 text-[#21e1b8] px-5 py-3 rounded-full border border-[#21e1b8]/40 transition-all hover:bg-[#21e1b8]/30"
          >
            داشبورد ادمین
          </Link>

          {(pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-5 py-3 rounded-full border border-red-400/40 transition-all hover:bg-red-500/30"
            >
              خروج
            </button>
          )}
        </div>
      );
    }

    if (user && user.role !== 'admin') {
      return (
        <div className="flex gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[#6ef2d6]/10 text-[#6ef2d6] px-5 py-3 rounded-full border border-[#6ef2d6]/40 transition-all hover:bg-[#6ef2d6]/20"
          >
            پروفایل کاربری
          </Link>

          {(pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-5 py-3 rounded-full border border-red-400/40 transition-all hover:bg-red-500/30"
            >
              خروج
            </button>
          )}
        </div>
      );
    }

    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 bg-gradient-to-br from-[#824dee] to-[#351b67] text-white px-5 py-3 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(130,77,238,.35)] transition-all hover:-translate-y-0.5"
      >
        ورود / ثبت‌نام
      </Link>
    );
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.06]"
      style={{
        backdropFilter: 'saturate(140%) blur(8px)',
        background: 'linear-gradient(180deg, rgba(11,11,18,.85), rgba(11,11,18,.65))',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5">
        <nav className="flex items-center justify-between gap-4 min-h-[72px]">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/dipod-logo.png"
              alt="لوگوی دیپاد"
              width={50}
              height={50}
              className="object-cover"
              priority
            />
            <h1 className="text-xl font-semibold m-0">
              دیپاد{' '}
              <span className="inline-flex items-center gap-1 text-[#0c1b17] bg-gradient-to-br from-[#6ef2d6] to-[#21e1b8] px-2 py-1 rounded-full text-xs font-bold">
                آفلاین اما مثل ابر
              </span>
            </h1>
          </Link>

          <ul className="hidden md:flex gap-4 list-none m-0 p-0">
            {[
              { href: '/', label: 'خانه' },
              { href: '/blog', label: 'مقالات' },
              { href: '/about', label: 'درباره ما' },
              { href: '/contact', label: 'تماس با ما' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[#e6e9ff] px-3 py-2 rounded-lg text-[0.95rem] opacity-90 hover:bg-white/[0.06] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-2">{renderUserButton()}</div>
        </nav>
      </div>
    </header>
  );
}
