"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const sheetRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const formAlertRef = useRef<HTMLDivElement | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    // mobile sheet wiring
    const openBtn = document.getElementById("openMenu");
    const closeBtn = document.getElementById("closeMenu");
    const sheet = sheetRef.current;
    if (openBtn) {
      const onOpen = () => {
        try { sheet?.showModal(); } catch { /* dialog not supported */ }
      };
      openBtn.addEventListener("click", onOpen);
      return () => openBtn.removeEventListener("click", onOpen);
    }
    return;
  }, []);

  useEffect(() => {
    // close button for sheet
    const closeBtn = document.getElementById("closeMenu");
    const sheet = sheetRef.current;
    if (!closeBtn) return;
    const onClose = () => {
      try { sheet?.close(); } catch {}
    };
    closeBtn.addEventListener("click", onClose);
    return () => closeBtn.removeEventListener("click", onClose);
  }, []);

  useEffect(() => {
    // smooth anchors: delegate to all internal anchors starting with #
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[];
    const handler = (e: MouseEvent) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        try { sheetRef.current?.close(); } catch {}
      }
    };
    anchors.forEach(a => a.addEventListener("click", handler));
    return () => anchors.forEach(a => a.removeEventListener("click", handler));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // demo behavior: show local note and scroll to form
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 10_000); // hide after 10s
    const top = formRef.current?.offsetTop ?? 0;
    window.scrollTo({ top: Math.max(top - 60, 0), behavior: "smooth" });
  }

  return (
    <>
      <Head>
        <title>تماس با دیپاد | مشاوره و پشتیبانی</title>
        <meta name="description" content="با دیپاد در تماس باشید: درخواست مشاوره، سوال‌های فنی، همکاری سازمانی. فرم تماس، اطلاعات ارتباطی، ساعات پاسخ‌گویی و سوالات پرتکرار." />
        <meta name="color-scheme" content="light dark" />
      </Head>

      <div
        dir="rtl"
        lang="fa"
        className="min-h-screen font-sans text-[#f5f7ff]"
        style={{
          background:
            "radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,0.14), transparent 60%), radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,0.15), transparent 60%), #0b0b12",
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-md backdrop-saturate-150 bg-[linear-gradient(180deg,rgba(11,11,18,0.85),rgba(11,11,18,0.65))] border-b border-[rgba(255,255,255,0.06)]">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-center justify-between gap-4 min-h-[72px]">
              <a href="/" className="flex items-center gap-3" aria-label="Dipad Home">
                <span
                  className="w-9 h-9 rounded-[12px] shadow-[0_6px_18px_rgba(130,77,238,0.45)]"
                  style={{ background: "conic-gradient(from 210deg at 50% 50%, #824dee, #351b67)" }}
                  aria-hidden
                />
                <h1 className="text-lg m-0 flex items-center gap-2">
                  دیپاد
                  <span
                    className="ml-2 inline-block text-[12px] font-bold rounded-full px-2 py-1"
                    style={{ background: "linear-gradient(135deg,#6ef2d6,#21e1b8)", color: "#0c1b17" }}
                  >
                    تماس با ما
                  </span>
                </h1>
              </a>

              <nav className="hidden md:block" aria-label="Primary">
                <ul className="flex gap-4 list-none m-0 p-0">
                  <li><a className="text-[#e6e9ff] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)]" href="/features">ویژگی‌ها</a></li>
                  <li><a className="text-[#e6e9ff] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)]" href="/how-it-works">چطور کار می‌کند</a></li>
                  <li><a className="text-[#e6e9ff] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)]" href="/pricing">قیمت‌ها</a></li>
                  <li><a className="text-[#e6e9ff] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)]" href="/blog">وبلاگ</a></li>
                </ul>
              </nav>

              <div className="flex items-center gap-3">
                <a className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.14)] text-sm" href="/">خانه</a>
                <a className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[linear-gradient(135deg,#824dee,#351b67)] text-white text-sm" href="#form">درخواست مشاوره</a>

                <button id="openMenu" aria-label="باز کردن منو" className="md:hidden grid place-items-center w-11 h-11 rounded-lg border border-[rgba(255,255,255,0.12)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7h16M4 12h16M4 17h16" stroke="#e8e8ff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile sheet */}
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l12 12M18 6l-12 12" stroke="#e8e8ff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="p-4">
            <a className="block w-full text-center mb-3 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)]" href="/features">ویژگی‌ها</a>
            <a className="block w-full text-center mb-3 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)]" href="/how-it-works">چطور کار می‌کند</a>
            <a className="block w-full text-center mb-3 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.12)]" href="/pricing">قیمت‌ها</a>
            <a className="block w-full text-center px-3 py-2 rounded-lg bg-[linear-gradient(135deg,#824dee,#351b67)] text-white" href="/blog">وبلاگ</a>
          </nav>
        </dialog>

        {/* Hero */}
        <section className="py-6 border-b border-[rgba(255,255,255,0.08)]">
          <div className="max-w-[1200px] mx-auto px-5 grid gap-6 lg:grid-cols-[1.2fr_.8fr] items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ background: "rgba(130,77,238,0.12)", border: "1px solid rgba(130,77,238,0.35)", color: "#dbe4ff" }}>پاسخ‌گویی شفاف</span>
              <h2 className="mt-3 leading-tight" style={{ fontSize: "clamp(1.6rem, 2.4vw + 1rem, 2.6rem)" }}>سریع‌ترین راه ارتباط با تیم دیپاد</h2>
              <p className="text-[#9aa0b6] mt-3">برای مشاوره، همکاری سازمانی، یا سوال فنی همین حالا پیام بفرستید. اطلاعات شما محرمانه می‌ماند و فقط برای پیگیری درخواست استفاده می‌شود.</p>

              <div className="mt-4 flex gap-3 flex-wrap">
                <a className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[linear-gradient(135deg,#824dee,#351b67)] text-white" href="#form">ارسال درخواست</a>
                <a className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-[rgba(255,255,255,0.12)]" href="#info">اطلاعات تماس</a>
              </div>
            </div>

            <div className="rounded-[18px] overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.25)] aspect-[16/10] grid place-items-center text-[#cfd6ff]">
              <div>نقشه و مسیر دسترسی (نمونه)</div>
            </div>
          </div>
        </section>

        {/* Contact form / Info */}
        <section id="form" className="py-10">
          <div className="max-w-[1200px] mx-auto px-5 grid gap-6 md:grid-cols-[1.1fr_.9fr]">
            {/* Form */}
            <form ref={formRef} className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-6" onSubmit={handleSubmit}>
              <h3 className="text-xl mb-1">فرم تماس</h3>
              <p className="text-[#9aa0b6] mb-4">لطفاً جزئیات را کامل بنویسید تا پاسخ دقیق‌تری بگیرید.</p>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm">نام و نام‌خانوادگی</label>
                  <input id="name" name="name" className="mt-2 w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" required placeholder="مثال: فاطمه مهاجری" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm">شماره تماس</label>
                  <input id="phone" name="phone" className="mt-2 w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" required placeholder="09xxxxxxxxx" pattern="^0?9\\d{9}$" />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 mt-3">
                <div>
                  <label htmlFor="email" className="block text-sm">ایمیل</label>
                  <input id="email" name="email" type="email" className="mt-2 w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" required placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="topic" className="block text-sm">موضوع</label>
                  <select id="topic" name="topic" className="mt-2 w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" required defaultValue="">
                    <option value="" disabled>انتخاب کنید…</option>
                    <option>مشاوره انتخاب رسانه و طرح</option>
                    <option>همکاری سازمانی</option>
                    <option>سوال فنی/امنیتی</option>
                    <option>پشتیبانی و بازیابی</option>
                    <option>سایر</option>
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label htmlFor="msg" className="block text-sm">توضیحات</label>
                <textarea id="msg" name="msg" rows={5} className="mt-2 w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" placeholder="حجم تقریبی داده، حساسیت، اولویت بازیابی، و هر نکتهٔ مرتبط…" />
              </div>

              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <label className="flex gap-3 items-start">
                  <input type="checkbox" required className="mt-2" />
                  <span className="text-[#9aa0b6] text-sm">تأیید می‌کنم اطلاعات مطابق <a className="underline" href="/privacy">سیاست حریم خصوصی</a> دیپاد استفاده می‌شود.</span>
                </label>
                <label className="flex gap-3 items-start">
                  <input type="checkbox" className="mt-2" />
                  <span className="text-[#9aa0b6] text-sm">در صورت نیاز به اشتراک اسناد حساس، تمایل به دریافت <strong>NDA</strong> دارم.</span>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[linear-gradient(135deg,#824dee,#351b67)] text-white" type="submit">ارسال درخواست</button>
                <span className="text-sm text-[#9aa0b6]">میانگین زمان پاسخ‌گویی: ۱–۲ روز کاری</span>
              </div>

              <div
                ref={formAlertRef}
                id="formAlert"
                className={`mt-4 p-3 rounded-lg ${alertVisible ? "block" : "hidden"}`}
                style={{ background: "rgba(33,225,184,0.1)", border: "1px solid rgba(33,225,184,0.25)", color: "#c6fff2" }}
                role="status"
                aria-live="polite"
              >
                در نسخهٔ نمونه، فرم به سرور متصل نیست. داده‌ها ارسال نشدند.
              </div>
            </form>

            {/* Info */}
            <aside id="info" className="space-y-4">
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-4">
                <h4 className="text-lg mb-2">اطلاعات تماس</h4>
                <ul className="text-[#dfe4ff] list-none m-0 p-0 space-y-2">
                  <li><strong>ایمیل عمومی:</strong> <span className="ltr">info@dipad.example</span></li>
                  <li><strong>پشتیبانی:</strong> <span className="ltr">support@dipad.example</span></li>
                  <li><strong>تلفن:</strong> <span className="ltr">+98-21-XXXXXXX</span></li>
                  <li><strong>تهران:</strong> همکاری سازمانی و تحویل رسانه</li>
                </ul>
              </div>

              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-4">
                <h4 className="text-lg mb-2">ساعات پاسخ‌گویی</h4>
                <p className="text-[#9aa0b6] m-0">شنبه تا چهارشنبه: ۹ تا ۱۷ — پنجشنبه: ۹ تا ۱۳</p>
                <p className="text-[#9aa0b6] mt-2">ایام تعطیل رسمی: فقط تیکت اضطراری سازمانی</p>
              </div>

              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-4">
                <h4 className="text-lg mb-2">کانال‌های ارتباطی</h4>
                <div className="flex gap-2 flex-wrap">
                  <a className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" href="#">تلگرام</a>
                  <a className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" href="#">واتس‌اپ</a>
                  <a className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" href="#">لینکدین</a>
                </div>
                <p className="text-[#9aa0b6] mt-3">برای تبادل اسناد حساس، از کانال‌های امنِ توافق‌شده استفاده می‌شود.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* Map / Location */}
        <section className="py-10">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-2xl m-0">موقعیت و مسیر</h3>
              <span className="text-sm text-[#9aa0b6]">تحویل/دریافت رسانه با هماهنگی قبلی</span>
            </div>

            <div className="rounded-[18px] border border-[rgba(255,255,255,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.25)] aspect-[16/9] grid place-items-center text-[#cfd6ff]">
              جای نقشه (Embed) — در نسخهٔ عملی، iframe نقشه اینجا قرار می‌گیرد.
            </div>
          </div>
        </section>

        {/* FAQ short */}
        <section className="py-10">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-2xl m-0">سوالات پرتکرار</h3>
              <span className="text-sm text-[#9aa0b6]">خلاصه پاسخ‌ها</span>
            </div>

            <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-4">
              <details open className="border-b border-dashed border-[rgba(255,255,255,0.12)] pb-3 mb-3">
                <summary className="cursor-pointer">چطور درخواست NDA بدهم؟</summary>
                <p className="text-[#9aa0b6] mt-2">در فرم، گزینهٔ «تمایل به دریافت NDA» را علامت بزنید؛ نسخهٔ امضا دیجیتال برای شما ارسال می‌شود.</p>
              </details>

              <details className="border-b border-dashed border-[rgba(255,255,255,0.12)] pb-3 mb-3">
                <summary className="cursor-pointer">ارسال رسانه فیزیکی چگونه است؟</summary>
                <p className="text-[#9aa0b6] mt-2">با هماهنگی قبلی از طریق پیکِ اختصاصی/پُست سفارشی و ثبت لاگ تحویل انجام می‌شود.</p>
              </details>

              <details>
                <summary className="cursor-pointer">وضعیت تیکت‌ها چگونه اطلاع‌رسانی می‌شود؟</summary>
                <p className="text-[#9aa0b6] mt-2">از طریق ایمیل/پنل کاربری؛ در طرح‌های سازمانی، داشبورد اختصاصی ارائه می‌شود.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] py-8">
          <div className="max-w-[1200px] mx-auto px-5 grid lg:grid-cols-[1.1fr_.9fr] gap-6">
            <div>
              <div className="flex items-start gap-3">
                <span className="w-11 h-11 rounded-[12px] shadow-[0_6px_18px_rgba(130,77,238,0.45)]" style={{ background: "conic-gradient(from 210deg at 50% 50%, #824dee, #351b67)" }} aria-hidden />
                <div>
                  <strong>دیپاد</strong>
                  <div className="text-sm text-[#9aa0b6] mt-1">ذخیره‌سازی آفلاین امن — مثل ابر، اما آفلاین</div>
                  <p className="text-sm text-[#9aa0b6] mt-3 max-w-[56ch]">مالک ایده و کسب‌وکار: شرکت رایان پرداز سیستم نور ایرانیان — این نسخه یک دموی طراحی است و اطلاعات تماس نمونه می‌باشد.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <h6 className="mb-2">محصول</h6>
                <ul className="list-none m-0 p-0 text-[#dfe4ff]">
                  <li><a href="/features" className="hover:underline">ویژگی‌ها</a></li>
                  <li><a href="/how-it-works" className="hover:underline">مراحل</a></li>
                  <li><a href="/pricing" className="hover:underline">قیمت‌ها</a></li>
                </ul>
              </div>

              <div>
                <h6 className="mb-2">منابع</h6>
                <ul className="list-none m-0 p-0 text-[#dfe4ff]">
                  <li><a href="/blog" className="hover:underline">وبلاگ</a></li>
                  <li><a href="#" className="hover:underline">سیاست حریم خصوصی</a></li>
                  <li><a href="#" className="hover:underline">شرایط استفاده</a></li>
                </ul>
              </div>

              <div>
                <h6 className="mb-2">تماس</h6>
                <ul className="list-none m-0 p-0 text-[#dfe4ff]">
                  <li className="ltr">info@dipad.example</li>
                  <li className="ltr">support@dipad.example</li>
                  <li className="ltr">+98-21-XXXXXXX</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-[1200px] mx-auto px-5 mt-4 text-sm text-[#9aa0b6]">© 2025 Dipad — All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}
