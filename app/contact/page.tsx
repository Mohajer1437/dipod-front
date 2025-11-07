"use client";

import ContactForm from "@/components/contact-form";
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
            <ContactForm/>

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
      </div>
    </>
  );
}
