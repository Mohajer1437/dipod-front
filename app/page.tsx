'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function DipadPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMobileMenuOpen(false);
      }
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: 'چطور مطمئن می‌شوم داده‌هایم واقعاً آفلاین است؟',
      a: 'پس از تکمیل فرایند رمزنگاری و تقسیم بسته‌ها، انتقال فیزیکی/کنترل‌شده به خزانه‌های آفلاین انجام می‌شود و گزارش گواهی آفلاین‌شدن صادر می‌گردد.'
    },
    {
      q: 'اگر کلیدها گم شوند چه می‌شود؟',
      a: 'سامانه مدیریت کلید تفکیکی است؛ بخشی نزد کاربر و بخشی نزد دیپاد/حافظان مورد اعتماد نگهداری می‌شود. پروتکل بازیابی چندمرحله‌ای تعریف می‌گردد.'
    },
    {
      q: 'زمان بازیابی چقدر است؟',
      a: 'بسته به طرح انتخابی، از ۱ تا ۵ روز کاری. در طرح سازمانی امکان دسترسی اضطراری هم وجود دارد.'
    },
    {
      q: 'آیا می‌توان رسانه ذخیره‌سازی را خودم انتخاب کنم؟',
      a: 'بله. بر اساس بودجه، دوام مورد انتظار و سیاست‌های انطباقی، یکی یا ترکیبی از HDD/Tape/Optical پیشنهاد می‌شود.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0b12] text-[#f5f7ff] font-[Vazirmatn,sans-serif]" dir="rtl" style={{
      background: 'radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,.14), transparent 60%), radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,.15), transparent 60%), #0b0b12'
    }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{
        backdropFilter: 'saturate(140%) blur(8px)',
        background: 'linear-gradient(180deg, rgba(11,11,18,.85), rgba(11,11,18,.65))'
      }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <nav className="flex items-center justify-between gap-4 min-h-[72px]">
            {/* Brand */}
            <a href="#top" onClick={(e) => handleSmoothScroll(e, '#top')} className="flex items-center gap-3">
              <div className="w-[38px] h-[38px] rounded-xl shadow-[0_6px_18px_rgba(130,77,238,.45)]" style={{
                background: 'conic-gradient(from 210deg at 50% 50%, #824dee, #351b67)'
              }}></div>
              <h1 className="text-xl font-semibold m-0">
                دیپاد <span className="inline-flex items-center gap-1 text-[#0c1b17] bg-gradient-to-br from-[#6ef2d6] to-[#21e1b8] px-2 py-1 rounded-full text-xs font-bold">آفلاین اما مثل ابر</span>
              </h1>
            </a>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-4 list-none m-0 p-0">
              {[
                { href: '#features', label: 'ویژگی‌ها' },
                { href: '#how', label: 'چطور کار می‌کند؟' },
                { href: '#compare', label: 'مقایسه' },
                { href: '#pricing', label: 'قیمت‌ها' },
                { href: '#faq', label: 'سوالات متداول' }
              ].map(item => (
                <li key={item.href}>
                  <a href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="text-[#e6e9ff] px-3 py-2 rounded-lg text-[0.95rem] opacity-90 hover:bg-white/[0.06] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex gap-2">
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="hidden sm:inline-flex items-center gap-2 bg-transparent text-white px-5 py-3 rounded-full border border-white/[0.14] transition-all hover:-translate-y-0.5">
                مشاوره رایگان
              </a>
              <a href="#cta" onClick={(e) => handleSmoothScroll(e, '#cta')} className="inline-flex items-center gap-2 bg-gradient-to-br from-[#824dee] to-[#351b67] text-white px-5 py-3 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(130,77,238,.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(130,77,238,.45)]">
                شروع کنید
              </a>
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden grid place-items-center w-11 h-11 rounded-xl border border-white/[0.12]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="#e8e8ff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Dialog */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-20" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-[#121222] rounded-3xl w-[min(92vw,420px)] shadow-[0_10px_30px_rgba(0,0,0,.25)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/[0.08]">
              <strong>منو</strong>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="#e8e8ff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <nav className="p-5">
              {[
                { href: '#features', label: 'ویژگی‌ها' },
                { href: '#how', label: 'چطور کار می‌کند؟' },
                { href: '#compare', label: 'مقایسه' },
                { href: '#pricing', label: 'قیمت‌ها' },
                { href: '#faq', label: 'سوالات متداول' }
              ].map(item => (
                <a key={item.href} href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="block my-3 bg-transparent text-white px-5 py-3 rounded-full border border-white/[0.14] text-center">
                  {item.label}
                </a>
              ))}
              <a href="#cta" onClick={(e) => handleSmoothScroll(e, '#cta')} className="block mt-2 bg-gradient-to-br from-[#824dee] to-[#351b67] text-white px-5 py-3 rounded-full border border-white/[0.08] text-center">
                شروع کنید
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Hero */}
      <main id="top" className="relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center py-14">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-2 text-[#dbe4ff] bg-[rgba(130,77,238,.12)] border border-[rgba(130,77,238,.35)] px-3 py-2 rounded-full text-sm">دو‌لایه رمزنگاری</span>
                <span className="inline-flex items-center gap-2 text-[#dbe4ff] bg-[rgba(130,77,238,.12)] border border-[rgba(130,77,238,.35)] px-3 py-2 rounded-full text-sm">انتقال ایمن</span>
                <span className="inline-flex items-center gap-2 text-[#dbe4ff] bg-[rgba(130,77,238,.12)] border border-[rgba(130,77,238,.35)] px-3 py-2 rounded-full text-sm">خزانه آفلاین</span>
              </div>
              <h2 className="text-[clamp(1.6rem,2.4vw+1rem,3rem)] leading-tight my-4">
                ذخیره‌سازی طولانی‌مدت، <u>آفلاین و امن</u> برای فایل‌های حیاتی شما
              </h2>
              <p className="text-[#9aa0b6] text-lg">
                دیپاد مثل ابر است، اما آفلاین: فایل‌ها را آپلود می‌کنید، ما آن‌ها را با دو روش رمزنگاری می‌کنیم، سپس بسته‌های رمزنگاری‌شده را از اینترنت جدا کرده و در خزانه‌های آفلاین نگهداری می‌کنیم. مناسب آرشیو اسناد حقوقی، پروژه‌های حساس، و خاطرات غیرقابل‌جایگزین.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <a href="#cta" onClick={(e) => handleSmoothScroll(e, '#cta')} className="inline-flex items-center gap-2 bg-gradient-to-br from-[#824dee] to-[#351b67] text-white px-5 py-3 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(130,77,238,.35)] transition-all hover:-translate-y-0.5">
                  همین حالا فایل‌ها را امن کنید
                </a>
                <a href="#how" onClick={(e) => handleSmoothScroll(e, '#how')} className="inline-flex items-center gap-2 bg-transparent text-white px-5 py-3 rounded-full border border-white/[0.14] transition-all hover:-translate-y-0.5">
                  دیدن مراحل کار
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <div className="flex gap-2 items-start text-[0.95rem] text-[#d8dcf2]">
                  <span className="w-[22px] h-[22px] inline-grid place-items-center rounded-lg bg-[rgba(130,77,238,.12)] border border-[rgba(130,77,238,.35)]">🔒</span>
                  بدون وابستگی به سرویس‌های تحریم‌شونده و ریسک اشتراک ناخواسته
                </div>
                <div className="flex gap-2 items-start text-[0.95rem] text-[#d8dcf2]">
                  <span className="w-[22px] h-[22px] inline-grid place-items-center rounded-lg bg-[rgba(130,77,238,.12)] border border-[rgba(130,77,238,.35)]">🗄️</span>
                  مناسب آرشیو چندساله؛ نگهداری در محیط‌های کنترل‌شده
                </div>
                <div className="flex gap-2 items-start text-[0.95rem] text-[#d8dcf2]">
                  <span className="w-[22px] h-[22px] inline-grid place-items-center rounded-lg bg-[rgba(130,77,238,.12)] border border-[rgba(130,77,238,.35)]">🧩</span>
                  تقسیم فایل‌ها به بسته‌های رمزنگاری‌شده (Sharding) برای امنیت بیشتر
                </div>
                <div className="flex gap-2 items-start text-[0.95rem] text-[#d8dcf2]">
                  <span className="w-[22px] h-[22px] inline-grid place-items-center rounded-lg bg-[rgba(130,77,238,.12)] border border-[rgba(130,77,238,.35)]">📜</span>
                  قرارداد سطح‌خدمت (SLA) و گزارش وضعیت نگهداری
                </div>
              </div>
            </div>
            <div className="relative isolate">
              <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5 shadow-[0_10px_30px_rgba(0,0,0,.25)]">
                <div className="border border-white/[0.08] rounded-[18px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,.5)]">
                  <img src="https://images.unsplash.com/photo-1544198365-3c4b5b2e21cb?q=80&w=1600&auto=format&fit=crop" alt="UI مفهومی دیپاد: داشبورد آپلود و وضعیت رمزنگاری" className="w-full h-auto" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[220px] -z-10" style={{
                background: 'linear-gradient(180deg, rgba(130,77,238,.08), transparent 40%)',
                filter: 'blur(40px)'
              }}></div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="py-15">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-end justify-between gap-3 mb-7 flex-wrap">
            <h3 className="m-0 text-[1.6rem] font-semibold">چرا دیپاد؟</h3>
            <span className="inline-flex items-center text-[#0c1b17] bg-gradient-to-br from-[#6ef2d6] to-[#21e1b8] px-2 py-1 rounded-full text-xs font-bold">امنیت، سادگی، دوام</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'امنیت آفلاین واقعـی', desc: 'پس از رمزنگاری، بسته‌های داده از شبکه جدا می‌شوند و در خزانه‌های آفلاینِ با دسترسی محدود نگهداری می‌گردند. حملات اینترنتی بی‌اثر می‌شوند.' },
              { title: 'رمزنگاری دولایه', desc: 'ترکیب الگوریتم‌های استاندارد صنعتی و مدیریت کلیدِ تفکیک‌شده باعث کاهش ریسک درز اطلاعات حتی در بدترین سناریوها می‌شود.' },
              { title: 'ردیابی و گزارش‌دهی', desc: 'هر بسته مسیر مشخص و گزارش‌های دوره‌ای دارد: زمان انتقال، وضعیت سلامت رسانه، و برنامه روتیشن/بازبینی.' },
              { title: 'پشتیبانی حقوقی و انطباق', desc: 'سیاست‌های نگهداری مطابق نیازهای انطباقی (Retention Policy)، قرارداد محرمانگی (NDA) و SLA شفاف ارائه می‌شود.' },
              { title: 'بازیابی کنترل‌شده', desc: 'بازگردانی داده‌ها تنها با احراز چندمرحله‌ای و تأییدیه خارج از بستر آنلاین ممکن است.' },
              { title: 'مقیاس‌پذیر و سفارشی', desc: 'از چند گیگ تا چند ده ترابایت؛ طرح‌های سازمانی با گزینه‌های رسانه متنوع (Tape/Optical/HDD) و سطح افزونگی قابل تنظیم.' }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5">
                <h4 className="mt-1 mb-2 font-semibold">{item.title}</h4>
                <p className="text-[#9aa0b6] m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-15">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-end justify-between gap-3 mb-7 flex-wrap">
            <h3 className="m-0 text-[1.6rem] font-semibold">مراحل کار دیپاد</h3>
            <span className="text-[#9aa0b6]">شفاف، قابل پیگیری، و امن</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '۱', title: 'آپلود امن', desc: 'فایل‌ها را در پنل وب یا از طریق کلاینت دسکتاپ آپلود می‌کنید. ارتباط کاملاً رمزنگاری‌شده و با محدودیت زمانی.' },
              { num: '۲', title: 'رمزنگاری دولایه + Sharding', desc: 'داده‌ها در محلِ امن ما به بسته‌های رمزنگاری‌شده تقسیم می‌شوند و کلیدها به‌صورت تفکیکی نگهداری می‌گردند.' },
              { num: '۳', title: 'انتقال به خزانه آفلاین', desc: 'بسته‌ها از اینترنت جدا و بر روی رسانه‌های منتخب (HDD/Tape/Optical) در خزانه‌های کنترل‌شده ذخیره می‌شوند.' },
              { num: '۴', title: 'گزارش و نگهداری دوره‌ای', desc: 'گزارش سلامت دوره‌ای، روتیشن رسانه‌ها، و امکان بازگردانی کنترل‌شده با احراز چندمرحله‌ای.' }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5 relative">
                <div className="font-extrabold text-lg text-[#cdd6ff]">{item.num}</div>
                <h5 className="mt-1 mb-2 font-semibold">{item.title}</h5>
                <p className="text-[#9aa0b6] text-[0.95rem] m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare */}
      <section id="compare" className="py-15">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-end justify-between gap-3 mb-7 flex-wrap">
            <h3 className="m-0 text-[1.6rem] font-semibold">مقایسه با گزینه‌های مرسوم</h3>
            <span className="text-[#9aa0b6]">دیپاد در برابر هارد اکسترنال، فلش، و کلود</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-[#121222] text-right border-b border-white/[0.08] p-4">معیار</th>
                    <th className="bg-[#121222] text-right border-b border-white/[0.08] p-4">دیپاد</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['امنیت شبکه', 'آفلاین (ایمن در برابر حملات آنلاین)'],
                    ['دوام طولانی‌مدت', 'بله (مدیریت رسانه + بازبینی)'],
                    ['ریسک گم‌شدن/سرقت', 'حداقل (کنترل دسترسی و لاگ)'],
                    ['انطباق و SLA', 'پشتیبانی می‌شود'],
                    ['وابستگی به تحریم‌ها', 'بدون وابستگی به سرویس خارجی']
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                      <td className="border-b border-white/[0.08] p-4">{row[0]}</td>
                      <td className="border-b border-white/[0.08] p-4">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5">
              <ul className="m-0 pr-4 text-[#9aa0b6] space-y-2">
                <li>هارد/فلش: ریسک خرابی فیزیکی، گم‌شدن، یا بدسکت؛ بدون گزارش سلامت دوره‌ای.</li>
                <li>کلود: آنلاین، در معرض هک/اشتراک ناخواسته؛ ریسک محدودیت/تحریم در ایران.</li>
                <li>دیپاد: آفلاینِ قابل‌ردیابی با گزارش نگهداری و امکان بازیابی کنترل‌شده.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-15">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-end justify-between gap-3 mb-7 flex-wrap">
            <h3 className="m-0 text-[1.6rem] font-semibold">طرح‌ها و قیمت‌ها</h3>
            <span className="text-[#9aa0b6]">قیمت‌های نمونه — قابل سفارشی‌سازی</span>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {
                title: 'شخصی',
                price: '۱٫۵',
                unit: 'میلیون',
                per: '/ هر ۵۰ گیگ',
                desc: 'آرشیو عکس‌ها و اسناد شخصی؛ گزارش سالانه سلامت.',
                features: ['رمزنگاری دولایه', 'گزارش سالانه', 'بازیابی در ۳–۵ روز'],
                highlighted: false
              },
              {
                title: 'حرفه‌ای',
                price: '۴٫۹',
                unit: 'میلیون',
                per: '/ هر ۲۰۰ گیگ',
                desc: 'پروژه‌های کاری و اسناد حساس؛ گزارش شش‌ماهه؛ اولویت بازیابی.',
                features: ['رمزنگاری + Sharding', 'گزارش شش‌ماهه', 'بازیابی در ۱–۳ روز'],
                highlighted: true
              },
              {
                title: 'سازمانی',
                price: 'تماس',
                unit: '',
                per: '/ بر اساس نیاز',
                desc: 'از چند ترابایت تا صدها ترابایت؛ رسانه انتخابی، افزونگی، و SLA اختصاصی.',
                features: ['رسانه Tape/Optical/HDD', 'بازبینی دوره‌ای سفارشی', 'دسترسی اضطراری'],
                highlighted: false
              }
            ].map((plan, i) => (
              <div key={i} className={`bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5 ${plan.highlighted ? 'outline outline-2 outline-[rgba(130,77,238,.45)] outline-offset-2' : ''}`}>
                <h4 className="font-semibold">{plan.title}</h4>
                <div className="flex items-baseline gap-2 my-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.unit && <span>{plan.unit}</span>}
                  <span className="text-[#9aa0b6]">{plan.per}</span>
                </div>
                <p className="text-[#9aa0b6] mb-3">{plan.desc}</p>
                <div className="grid gap-2 my-3">
                  {plan.features.map((f, j) => (
                    <div key={j}>• {f}</div>
                  ))}
                </div>
                <a href={i === 2 ? '#contact' : '#cta'} onClick={(e) => handleSmoothScroll(e, i === 2 ? '#contact' : '#cta')} className="inline-flex items-center gap-2 bg-gradient-to-br from-[#824dee] to-[#351b67] text-white px-5 py-3 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(130,77,238,.35)] transition-all hover:-translate-y-0.5">
                  {i === 2 ? 'دریافت پیش‌نهاد' : 'انتخاب این طرح'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="py-15">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-end justify-between gap-3 mb-7 flex-wrap">
            <h3 className="m-0 text-[1.6rem] font-semibold">موارد استفاده و اعتماد</h3>
            <span className="text-[#9aa0b6]">برای چه کسانی مناسب است؟</span>
          </div>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5">
              <h4 className="font-semibold mb-3">این سرویس برای شماست اگر…</h4>
              <ul className="m-0 pr-4 text-[#9aa0b6] space-y-2">
                <li>اسناد حقوقی/مالی دارید که باید سال‌ها سالم بمانند.</li>
                <li>استارتاپ/شرکتی هستید که به آرشیو پروژه‌های حساس نیاز دارد.</li>
                <li>عکاس/فیلم‌بردارید و آرشیو خاطرات مشتری‌ها غیرقابل‌تکرار است.</li>
                <li>نمی‌خواهید به سرویس‌های خارجی و تحریم‌ها وابسته باشید.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5">
              <h4 className="font-semibold mb-3">استانداردهای پیشنهادی نگهداری</h4>
              <p className="text-[#9aa0b6] mb-3">مدیای منتخب بر اساس بودجه/دوام: HDD برای دسترسی سریع‌تر، Tape برای آرشیو اقتصادی، Optical برای بایگانی بلندمدت. روتیشن ۱۲–۱۸ ماهه برای HDD پیشنهاد می‌شود.</p>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="inline-flex items-center gap-2 bg-transparent text-white px-5 py-3 rounded-full border border-white/[0.14] transition-all hover:-translate-y-0.5">
                مشاوره انتخاب رسانه
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-15">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-end justify-between gap-3 mb-7 flex-wrap">
            <h3 className="m-0 text-[1.6rem] font-semibold">سوالات متداول</h3>
            <span className="text-[#9aa0b6]">اگر پاسخ را پیدا نکردید، با ما در تماس باشید.</span>
          </div>
          <div className="space-y-0">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-dashed border-white/[0.12]">
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between gap-3 py-4 text-right cursor-pointer" aria-expanded={expandedFaq === i}>
                  <span className="font-bold">{item.q}</span>
                  <span aria-hidden="true">{expandedFaq === i ? '−' : '＋'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-250 ${expandedFaq === i ? 'max-h-60' : 'max-h-0'}`}>
                  <div className="text-[#9aa0b6] pb-4">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section id="cta" className="py-15">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="bg-gradient-to-br from-[rgba(130,77,238,.18)] to-[rgba(33,225,184,.12)] border border-white/[0.12] rounded-[20px] p-7 grid lg:grid-cols-[1fr_auto] gap-3 items-center">
            <div>
              <h3 className="m-0 mb-2 text-xl font-semibold">آماده‌اید خیالتان از آرشیو راحت شود؟</h3>
              <p className="text-[#9aa0b6] m-0">یک مشاوره کوتاه بگیرید تا بهترین طرح را بر اساس بودجه و نیازتان پیشنهاد دهیم.</p>
            </div>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="inline-flex items-center gap-2 bg-gradient-to-br from-[#824dee] to-[#351b67] text-white px-5 py-3 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(130,77,238,.35)] transition-all hover:-translate-y-0.5 whitespace-nowrap">
              درخواست مشاوره
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-15">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-end justify-between gap-3 mb-7 flex-wrap">
            <h3 className="m-0 text-[1.6rem] font-semibold">در تماس باشید</h3>
            <span className="text-[#9aa0b6]">فرم نمونه (ارسال واقعی متصل نیست)</span>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('در نسخه نمونه، فرم به سرور متصل نیست.'); }} className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-[18px] p-5">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block mb-2">نام</label>
                <input id="name" name="name" required placeholder="نام شما" className="w-full bg-[#0f0f1a] border border-white/[0.12] text-[#f5f7ff] rounded-xl p-3" />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2">شماره تماس</label>
                <input id="phone" name="phone" required placeholder="09xxxxxxxxx" className="w-full bg-[#0f0f1a] border border-white/[0.12] text-[#f5f7ff] rounded-xl p-3" />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="msg" className="block mb-2">توضیحات</label>
              <textarea id="msg" name="msg" rows={4} placeholder="نوع داده، حجم تقریبی، انتظارات بازیابی…" className="w-full bg-[#0f0f1a] border border-white/[0.12] text-[#f5f7ff] rounded-xl p-3"></textarea>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <button type="submit" className="inline-flex items-center gap-2 bg-gradient-to-br from-[#824dee] to-[#351b67] text-white px-5 py-3 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(130,77,238,.35)] transition-all hover:-translate-y-0.5">
                ارسال درخواست
              </button>
              <span className="text-[#9aa0b6]">یا با ما تماس بگیرید: <strong dir="ltr">+98-21-XXXXXXX</strong></span>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-black/20 py-7">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4 items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[38px] h-[38px] rounded-xl" style={{
                  background: 'conic-gradient(from 210deg at 50% 50%, #824dee, #351b67)'
                }}></div>
                <div>
                  <strong>دیپاد</strong>
                  <div className="text-[#9aa0b6] text-sm mt-1">ذخیره‌سازی آفلاین امن — مثل ابر، اما آفلاین</div>
                </div>
              </div>
              <p className="text-[#9aa0b6] max-w-[56ch] m-0">
                مالک ایده و کسب‌وکار: شرکت رایان پرداز سیستم نور ایرانیان — این نسخه یک دموی طراحی است و اطلاعات تماس نمونه می‌باشد.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <h6 className="font-semibold mb-2">محصول</h6>
                <ul className="list-none p-0 m-0 space-y-1 text-[#dfe4ff]">
                  <li><a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className="hover:text-white transition-colors">ویژگی‌ها</a></li>
                  <li><a href="#how" onClick={(e) => handleSmoothScroll(e, '#how')} className="hover:text-white transition-colors">مراحل</a></li>
                  <li><a href="#compare" onClick={(e) => handleSmoothScroll(e, '#compare')} className="hover:text-white transition-colors">مقایسه</a></li>
                  <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')} className="hover:text-white transition-colors">قیمت‌ها</a></li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold mb-2">منابع</h6>
                <ul className="list-none p-0 m-0 space-y-1 text-[#dfe4ff]">
                  <li><a href="#faq" onClick={(e) => handleSmoothScroll(e, '#faq')} className="hover:text-white transition-colors">سوالات</a></li>
                  <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="hover:text-white transition-colors">تماس</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">سیاست حفظ حریم خصوصی</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">شرایط استفاده</a></li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold mb-2">تماس</h6>
                <ul className="list-none p-0 m-0 space-y-1 text-[#dfe4ff]">
                  <li dir="ltr">info@dipad.example</li>
                  <li dir="ltr">+98-21-XXXXXXX</li>
                  <li>تهران / امکان ارائه خدمات سازمانی</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-[#9aa0b6] text-sm">© 2025 Dipad — All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}