"use client";

import Head from "next/head";
import { useEffect, useRef } from "react";

export default function BlogPage() {
  const sheetRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    // smooth internal anchors that start with #
    function onClick(e: Event) {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        // close mobile sheet if open
        try { sheetRef.current?.close(); } catch {}
      }
    }
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[];
    anchors.forEach((a) => a.addEventListener("click", onClick));
    return () => anchors.forEach((a) => a.removeEventListener("click", onClick));
  }, []);

  useEffect(() => {
    const openBtn = document.getElementById("openMenu");
    const closeBtn = document.getElementById("closeMenu");
    const sheet = sheetRef.current;

    function open() {
      try { sheet?.showModal(); } catch { /* fallback not required */ }
    }
    function close() {
      try { sheet?.close(); } catch {}
    }

    openBtn?.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);

    return () => {
      openBtn?.removeEventListener("click", open);
      closeBtn?.removeEventListener("click", close);
    };
  }, []);

  return (
    <>
      <Head>
        <title>وبلاگ دیپاد | اخبار، راهنماها و نکات آرشیو امن آفلاین</title>
        <meta name="description" content="وبلاگ دیپاد: مقالات آموزشی درباره ذخیره‌سازی آفلاین، مقایسه رسانه‌ها (HDD/Tape/Optical)، امنیت داده، رمزنگاری و بهترین روش‌های آرشیو طولانی‌مدت." />
        <meta name="color-scheme" content="light dark" />
      </Head>

      <div
        dir="rtl"
        lang="fa"
        className="min-h-screen text-[#f5f7ff] font-sans"
        style={{
          background:
            "radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,0.14), transparent 60%), radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,0.15), transparent 60%), #0b0b12",
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-60 backdrop-blur-md backdrop-saturate-150 bg-[linear-gradient(180deg,rgba(11,11,18,0.85),rgba(11,11,18,0.65))] border-b border-[rgba(255,255,255,0.06)]">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-center justify-between gap-4 min-h-[72px]">
              <a href="#" className="flex items-center gap-3" aria-label="Dipad Home">
                <span
                  className="w-9 h-9 rounded-[12px] shadow-[0_6px_18px_rgba(130,77,238,0.45)]"
                  style={{ background: "conic-gradient(from 210deg at 50% 50%, #824dee, #351b67)" }}
                  aria-hidden
                />
                <h1 className="text-lg m-0 flex items-center gap-2">
                  دیپاد <span className="text-[12px] font-bold rounded-full px-2 py-1" style={{ background: "linear-gradient(135deg,#6ef2d6,#21e1b8)", color: "#0c1b17" }}>وبلاگ</span>
                </h1>
              </a>

              <nav aria-label="Primary" className="hidden md:block">
                <ul className="flex gap-4 list-none m-0 p-0">
                  <li><a className="text-[#e6e9ff] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)]" href="/">خانه</a></li>
                  <li><a className="text-[#e6e9ff] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)]" href="/features">ویژگی‌ها</a></li>
                  <li><a className="text-[#e6e9ff] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)]" href="/pricing">قیمت‌ها</a></li>
                  <li><a className="text-[#e6e9ff] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)]" href="/contact">تماس</a></li>
                </ul>
              </nav>

              <div className="flex items-center gap-3">
                <a className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.14)] text-sm" href="/">بازگشت به سایت</a>
                <a className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[linear-gradient(135deg,#824dee,#351b67)] text-white text-sm" href="#newsletter">عضویت خبرنامه</a>

                {/* hamburger */}
                <button id="openMenu" aria-label="باز کردن منو" className="md:hidden grid place-items-center w-11 h-11 rounded-lg border border-[rgba(255,255,255,0.12)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7h16M4 12h16M4 17h16" stroke="#e8e8ff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile sheet (dialog) */}
        <dialog
          ref={sheetRef}
          id="sheet"
          className="md:hidden"
          style={{
            border: "none",
            padding: 0,
            width: "min(92vw,420px)",
            background: "#121222",
            color: "#f5f7ff",
            borderRadius: 20,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <strong>منو</strong>
            <button id="closeMenu" aria-label="بستن" className="p-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l12 12M18 6l-12 12" stroke="#e8e8ff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="p-4">
            <a className="block w-full text-center mb-3 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)]" href="/">خانه</a>
            <a className="block w-full text-center mb-3 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)]" href="/features">ویژگی‌ها</a>
            <a className="block w-full text-center mb-3 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)]" href="/pricing">قیمت‌ها</a>
            <a className="block w-full text-center px-3 py-2 rounded-lg bg-[linear-gradient(135deg,#824dee,#351b67)] text-white" href="/contact">تماس</a>
          </nav>
        </dialog>

        {/* Page head */}
        <div className="max-w-[1200px] mx-auto px-5 pt-7 pb-4">
          <div className="text-sm text-[#9aa0b6]">
            <a href="/" className="text-[#cfd6ff]">خانه</a> <span className="mx-2">/</span> <span>وبلاگ</span>
          </div>

          <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-2xl font-semibold">وبلاگ دیپاد</h2>

            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => { e.preventDefault(); alert("جستجو در نسخه نمونه فعال نیست"); }}>
              <input className="flex-1 min-w-0 bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2 text-sm" placeholder="جستجو در مقالات…" />
              <button type="submit" className="px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] text-sm">جستجو</button>
            </form>
          </div>
        </div>

        {/* Main layout */}
        <main className="max-w-[1200px] mx-auto px-5 pb-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-5">
            {/* Main column */}
            <section className="space-y-5">
              {/* Featured */}
              <div className="grid md:grid-cols-[1.2fr_.8fr] gap-4 mb-4">
                <article className="rounded-[18px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                  <img className="w-full object-cover aspect-[16/8]" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1400&auto=format&fit=crop" alt="راهنمای جامع انتخاب رسانه برای آرشیو آفلاین" />
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 text-[#cfd6ff] text-sm">
                      <span>راهنما</span>
                      <span className="opacity-50">•</span>
                      <time dateTime="2025-08-05">۱۴ مرداد ۱۴۰۴</time>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold"><a href="#" className="hover:underline">راهنمای جامع: HDD، Tape یا Optical؟ کدام برای آرشیو بلندمدت بهتر است؟</a></h3>
                    <p className="mt-2 text-[#9aa0b6]">در این مقاله با مزایا و معایب هر رسانه، هزینه‌های روتیشن، و سناریوهای ترکیبی آشنا می‌شوید تا برای آرشیو چندساله بهترین تصمیم را بگیرید.</p>
                  </div>
                </article>

                <article className="rounded-[18px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                  <img className="w-full object-cover aspect-[16/9]" src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop" alt="رمزنگاری دولایه و مدیریت کلید" />
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 text-[#cfd6ff] text-sm">
                      <span>امنیت</span>
                      <span className="opacity-50">•</span>
                      <time dateTime="2025-07-28">۶ مرداد ۱۴۰۴</time>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold"><a href="#" className="hover:underline">چطور رمزنگاری دولایه ریسک افشای داده را نزدیک به صفر می‌کند</a></h3>
                    <p className="mt-2 text-[#9aa0b6]">به‌زبان ساده از الگوی تفکیک کلید، Sharding و کنترل‌های دسترسیِ چندسطحی می‌گوییم.</p>
                  </div>
                </article>
              </div>

              {/* Posts grid */}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {[
                  {
                    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
                    tag: "عملیاتی",
                    date: "2025-07-20",
                    title: "چرا SLA واقعی بدون گزارش سلامت معنا ندارد؟",
                    excerpt: "با چک‌لیست گزارش‌های دوره‌ای، شاخص‌های سلامت رسانه و زمان‌بندی روتیشن آشنا شوید.",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1544198365-3c4b5b2e21cb?q=80&w=1200&auto=format&fit=crop",
                    tag: "مطالعه موردی",
                    date: "2025-07-12",
                    title: "مطالعه موردی: مهاجرت آرشیو یک استودیو به دیپاد",
                    excerpt: "از برآورد اولیه تا تقسیم بسته‌ها و تحویل در خزانه آفلاین — قدم‌به‌قدم.",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1555617719-73f7b69ee14d?q=80&w=1200&auto=format&fit=crop",
                    tag: "سیاست‌ها",
                    date: "2025-07-01",
                    title: "Retention Policy چیست و چگونه بنویسیم؟",
                    excerpt: "اصول تعیین بازه‌های نگهداری، طبقه‌بندی داده‌ها و حذف امن در پایان عمر مفید.",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
                    tag: "تحلیل هزینه",
                    date: "2025-06-20",
                    title: "هزینه کل مالکیت (TCO) در آرشیو آفلاین",
                    excerpt: "مدل محاسبه ساده برای برآورد هزینه چندساله با سناریوهای فراوانی متفاوت.",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
                    tag: "محصول",
                    date: "2025-06-12",
                    title: "معرفی نسخه جدید کلاینت آپلود امن دیپاد",
                    excerpt: "محدودیت زمانی لینک، ازسرگیری آپلود و گزارش لحظه‌ای رمزنگاری.",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1524169358666-79f22534bc6e?q=80&w=1200&auto=format&fit=crop",
                    tag: "امنیت",
                    date: "2025-05-28",
                    title: "چرا قطع اتصال از اینترنت هنوز بهترین دفاع است؟",
                    excerpt: "مروری بر سناریوهای نشت داده و نقش آفلاین‌بودن در مهار زنجیره حمله.",
                  },
                ].map((p, idx) => (
                  <article key={idx} className="rounded-[14px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                    <img className="w-full object-cover aspect-[16/9]" src={p.img} alt={p.title} />
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 text-[#cfd6ff] text-sm">
                        <span>{p.tag}</span>
                        <span className="opacity-50">•</span>
                        <time dateTime={p.date}>{/* Persian date text kept as in original */}{idx === 0 ? "۲۹ تیر ۱۴۰۴" : idx === 1 ? "۲۱ تیر ۱۴۰۴" : idx === 2 ? "۱۰ تیر ۱۴۰۴" : idx === 3 ? "۳۰ خرداد ۱۴۰۴" : idx === 4 ? "۲۲ خرداد ۱۴۰۴" : "۷ خرداد ۱۴۰۴"}</time>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold"><a href="#" className="hover:underline">{p.title}</a></h3>
                      <p className="mt-2 text-[#9aa0b6]">{p.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <nav aria-label="صفحه‌بندی" className="flex justify-center gap-2 mt-6">
                <a className="px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.14)]" href="#" aria-label="قبلی">«</a>
                <a className="px-3 py-2 rounded-lg bg-[linear-gradient(135deg,#824dee,#351b67)] text-white" href="#" aria-current="page">1</a>
                <a className="px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.14)]" href="#">2</a>
                <a className="px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.14)]" href="#">3</a>
                <a className="px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.14)]" href="#" aria-label="بعدی">»</a>
              </nav>
            </section>

            {/* Sidebar */}
            <aside>
              <div className="space-y-4">
                <div className="rounded-[14px] border border-[rgba(255,255,255,0.08)] overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                  <div className="p-4 border-b border-dashed border-[rgba(255,255,255,0.1)]">
                    <strong>دسته‌بندی‌ها</strong>
                    <div className="h-2" />
                    <div className="flex flex-col gap-2">
                      <a className="flex items-center justify-between gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" href="#"><span>امنیت</span><span className="inline-flex items-center px-2 py-1 rounded-full text-xs" style={{ background: "rgba(130,77,238,0.12)", border: "1px solid rgba(130,77,238,0.35)" }}>۱۲</span></a>
                      <a className="flex items-center justify-between gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" href="#"><span>راهنما</span><span className="inline-flex items-center px-2 py-1 rounded-full text-xs" style={{ background: "rgba(130,77,238,0.12)", border: "1px solid rgba(130,77,238,0.35)" }}>۹</span></a>
                      <a className="flex items-center justify-between gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" href="#"><span>تحلیل هزینه</span><span className="inline-flex items-center px-2 py-1 rounded-full text-xs" style={{ background: "rgba(130,77,238,0.12)", border: "1px solid rgba(130,77,238,0.35)" }}>۶</span></a>
                      <a className="flex items-center justify-between gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" href="#"><span>محصول</span><span className="inline-flex items-center px-2 py-1 rounded-full text-xs" style={{ background: "rgba(130,77,238,0.12)", border: "1px solid rgba(130,77,238,0.35)" }}>۴</span></a>
                    </div>
                  </div>

                  <div className="p-4 border-b border-dashed border-[rgba(255,255,255,0.1)]">
                    <strong>برچسب‌ها</strong>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["#Tape", "#HDD", "#Optical", "#Sharding", "#SLA", "#Retention", "#KeyMgmt"].map((t) => (
                        <a key={t} href="#" className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.12)] text-sm">{t}</a>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-b border-dashed border-[rgba(255,255,255,0.1)]">
                    <strong>پربازدیدها</strong>
                    <div className="mt-3 grid gap-3">
                      <a href="#" className="block rounded-[10px] overflow-hidden border border-[rgba(255,255,255,0.06)]">
                        <img className="w-full object-cover aspect-[16/9]" src="https://images.unsplash.com/photo-1512412046876-a62acfe22626?q=80&w=800&auto=format&fit=crop" alt="چک‌لیست امنیت" />
                        <div className="p-3">
                          <div className="text-sm font-semibold">چک‌لیست امنیت آرشیو آفلاین</div>
                        </div>
                      </a>

                      <a href="#" className="block rounded-[10px] overflow-hidden border border-[rgba(255,255,255,0.06)]">
                        <img className="w-full object-cover aspect-[16/9]" src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=800&auto=format&fit=crop" alt="راهنمای شروع" />
                        <div className="p-3">
                          <div className="text-sm font-semibold">راهنمای شروع سریع با دیپاد</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div id="newsletter" className="p-4" style={{ background: "linear-gradient(135deg, rgba(130,77,238,0.18), rgba(33,225,184,0.12))", borderTop: "1px solid rgba(255,255,255,0.12)", borderRadius: "0 0 10px 10px" }}>
                    <strong>عضویت خبرنامه</strong>
                    <p className="mt-2 text-sm text-[#9aa0b6]">آخرین راهنماها و خبرها را در ایمیل دریافت کنید.</p>
                    <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); alert("ارسال نمونه: فرم متصل نیست"); }}>
                      <input className="flex-1 bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2 text-sm" type="email" placeholder="ایمیل شما" required />
                      <button className="px-3 py-2 rounded-lg bg-[linear-gradient(135deg,#824dee,#351b67)] text-white">عضویت</button>
                    </form>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Footer */}
          <footer className="mt-8 border-t border-[rgba(255,255,255,0.08)] pt-8">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div className="flex gap-3 items-start">
                <span
                  className="w-11 h-11 rounded-[12px] shadow-[0_6px_18px_rgba(130,77,238,0.45)]"
                  style={{ background: "conic-gradient(from 210deg at 50% 50%, #824dee, #351b67)" }}
                  aria-hidden
                />
                <div>
                  <strong className="block">دیپاد</strong>
                  <div className="text-sm text-[#9aa0b6] mt-1">وبلاگ دیپاد — تازه‌های آرشیو آفلاین</div>
                  <p className="text-sm text-[#9aa0b6] mt-3 max-w-[56ch]">تمامی مقالات آموزشی بوده و جایگزین مشاوره تخصصی نیستند. برای پروژه‌های سازمانی با ما تماس بگیرید.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h6 className="mb-2">صفحات</h6>
                  <ul className="list-none m-0 p-0 text-[#dfe4ff]">
                    <li><a href="/features" className="hover:underline">ویژگی‌ها</a></li>
                    <li><a href="/how-it-works" className="hover:underline">مراحل کار</a></li>
                    <li><a href="/pricing" className="hover:underline">قیمت‌ها</a></li>
                  </ul>
                </div>

                <div>
                  <h6 className="mb-2">راهنماها</h6>
                  <ul className="list-none m-0 p-0 text-[#dfe4ff]">
                    <li><a href="#" className="hover:underline">شروع سریع</a></li>
                    <li><a href="#" className="hover:underline">انتخاب رسانه</a></li>
                    <li><a href="#" className="hover:underline">امنیت و کلیدها</a></li>
                  </ul>
                </div>

                <div>
                  <h6 className="mb-2">تماس</h6>
                  <ul className="list-none m-0 p-0 text-[#dfe4ff]">
                    <li className="ltr">blog@dipad.example</li>
                    <li className="ltr">+98-21-XXXXXXX</li>
                    <li>تهران / خدمات سازمانی</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-[#9aa0b6]">© 2025 Dipad — Blog.</div>
          </footer>
        </main>
      </div>
    </>
  );
}