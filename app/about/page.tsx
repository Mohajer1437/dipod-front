"use client";

import ContactForm from "@/components/contact-form";
import Head from "next/head";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const sheetRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    // smooth anchors (close sheet on navigation)
    const handler = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        try { sheetRef.current?.close(); } catch {}
      }
    };
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[];
    anchors.forEach((a) => a.addEventListener("click", handler));
    return () => anchors.forEach((a) => a.removeEventListener("click", handler));
  }, []);

  useEffect(() => {
    // mobile sheet open/close wiring
    const openBtn = document.getElementById("openMenu");
    const closeBtn = document.getElementById("closeMenu");
    const sheet = sheetRef.current;
    if (!openBtn) return;
    const onOpen = () => { try { sheet?.showModal(); } catch {} };
    const onClose = () => { try { sheet?.close(); } catch {} };
    openBtn.addEventListener("click", onOpen);
    closeBtn?.addEventListener("click", onClose);
    return () => {
      openBtn.removeEventListener("click", onOpen);
      closeBtn?.removeEventListener("click", onClose);
    };
  }, []);

  return (
    <>
      <Head>
        <title>درباره دیپاد | مثل ابر، اما آفلاین</title>
        <meta name="description" content="با دیپاد آشنا شوید: مأموریت، داستان شکل‌گیری، مدل امنیتی آفلاین، تیم و ارزش‌ها." />
        <meta name="color-scheme" content="light dark" />
      </Head>

      <div
        dir="rtl"
        lang="fa"
        className="min-h-screen font-sans text-[#f5f7ff] bg-[radial-gradient(1200px_800px_at_90%_-10%,rgba(130,77,238,0.14),transparent_60%),radial-gradient(900px_600px_at_-10%_10%,rgba(53,27,103,0.15),transparent_60%),#0b0b12]"
        style={{ WebkitFontSmoothing: "antialiased" }}
      >

        {/* Hero */}
        <section className="py-6 border-b border-[rgba(255,255,255,0.08)]">
          <div className="max-w-[1200px] mx-auto px-5 grid gap-6 lg:grid-cols-[1.2fr_.8fr] items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ background: "rgba(130,77,238,0.12)", border: "1px solid rgba(130,77,238,0.35)", color: "#dbe4ff" }}>ماموریت ما</span>
              <h2 className="mt-3 leading-tight" style={{ fontSize: "clamp(1.6rem, 2.4vw + 1rem, 2.6rem)" }}>
                آرشیو بلندمدتِ واقعاً امن — <u>بدون اتصال دائم به اینترنت</u>
              </h2>
              <p className="text-[#9aa0b6] mt-3">
                دیپاد برای کسانی ساخته شده که می‌خواهند سال‌ها بعد هم با خیال راحت به فایل‌های غیرقابل‌جایگزینشان دسترسی داشته باشند؛ بدون ریسک نشت آنلاین یا وابستگی به سرویس‌های تحریم‌شونده.
              </p>

              <div className="mt-4 flex gap-3 flex-wrap">
                <a className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[linear-gradient(135deg,#824dee,#351b67)] text-white" href="#model">مدل امنیتی دیپاد</a>
                <a className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-[rgba(255,255,255,0.12)]" href="#story">داستان شکل‌گیری</a>
              </div>
            </div>

            <div className="rounded-[18px] overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <img src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1600&auto=format&fit=crop" alt="تصویر مفهومی امنیت آفلاین" className="w-full h-auto object-cover" />
            </div>
          </div>
        </section>

        {/* Story / Timeline */}
        <section id="story" className="py-10">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-2xl m-0">داستان دیپاد</h3>
              <span className="inline-flex items-center px-2 py-1 rounded-full" style={{ background: "linear-gradient(135deg,#6ef2d6,#21e1b8)", color: "#0c1b17" }}>از نیاز واقعی تا محصول</span>
            </div>

            <div className="relative">
              {/* center line visible on md+ */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.12)]" aria-hidden />

              <div className="space-y-8">
                {/* alternate sides - simplified but responsive & aligned with center line */}
                <div className="md:grid md:grid-cols-2 md:gap-6 items-start">
                  <div className="md:col-start-1">
                    <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                      <h4 className="text-lg">ایده اولیه</h4>
                      <p className="text-[#9aa0b6] mt-2">جایی که هارد اکسترنال سقوط کرد، فلش گم شد، و سرویس‌های ابری به‌ خاطر تحریم/ریسک اشتراک ناخواسته قابل اتکا نبودند؛ نیاز به یک «ابرِ آفلاین» جدی شد.</p>
                    </div>
                  </div>
                  <div className="md:col-start-2 flex md:justify-end">
                    <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg,#824dee,#351b67)", boxShadow: "0 0 0 6px rgba(130,77,238,0.06)" }} aria-hidden />
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-6 items-start">
                  <div className="md:col-start-1 flex md:justify-start hidden md:block">
                    <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg,#824dee,#351b67)", boxShadow: "0 0 0 6px rgba(130,77,238,0.06)" }} aria-hidden />
                  </div>
                  <div className="md:col-start-2">
                    <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                      <h4 className="text-lg">طراحی مدل امنیتی</h4>
                      <p className="text-[#9aa0b6] mt-2">رمزنگاری دولایه + تفکیک کلید + Sharding بسته‌های داده، و جداسازی فیزیکی از اینترنت به‌عنوان هستهٔ محصول.</p>
                    </div>
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-6 items-start">
                  <div className="md:col-start-1">
                    <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                      <h4 className="text-lg">نمونه‌سازی و پایلوت</h4>
                      <p className="text-[#9aa0b6] mt-2">پایلوت با آرشیو واقعیِ اسناد/رسانه و تست‌های بازیابی کنترل‌شده؛ تدوین SLA و گزارش سلامت دوره‌ای.</p>
                    </div>
                  </div>
                  <div className="md:col-start-2 flex md:justify-end">
                    <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg,#824dee,#351b67)", boxShadow: "0 0 0 6px rgba(130,77,238,0.06)" }} aria-hidden />
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-6 items-start">
                  <div className="md:col-start-1 flex md:justify-start hidden md:block">
                    <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg,#824dee,#351b67)", boxShadow: "0 0 0 6px rgba(130,77,238,0.06)" }} aria-hidden />
                  </div>
                  <div className="md:col-start-2">
                    <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                      <h4 className="text-lg">آماده برای سازمان‌ها</h4>
                      <p className="text-[#9aa0b6] mt-2">پشتیبانی از رسانه‌های Tape/Optical/HDD، سیاست‌های نگهداری (Retention)، و مسیر مهاجرت مشاوره‌ای.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="values" className="py-10">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-2xl m-0">ارزش‌های ما</h3>
              <span className="text-sm text-[#9aa0b6]">اصولی که هر روز به آن پایبندیم</span>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                <h4 className="text-lg">امنیت قبل از هر چیز</h4>
                <p className="text-[#9aa0b6] mt-2">هر تصمیم محصولی با معیار «کمینه‌کردن سطح حمله و ریسک انسانی» سنجیده می‌شود.</p>
              </div>

              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                <h4 className="text-lg">شفافیت</h4>
                <p className="text-[#9aa0b6] mt-2">گزارش‌های سلامت، وضعیت رسانه و مسیر بسته‌ها به‌صورت دوره‌ای ارائه می‌شود.</p>
              </div>

              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                <h4 className="text-lg">مالکیت داده</h4>
                <p className="text-[#9aa0b6] mt-2">کاربر مالک داده و بخشی از کلیدهاست؛ ما صرفاً امینِ نگهداری آفلاین هستیم.</p>
              </div>

              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                <h4 className="text-lg">بی‌نیازی از سرویس خارجی</h4>
                <p className="text-[#9aa0b6] mt-2">عدم وابستگی به سرویس‌های تحریم‌شونده، برای تداوم دسترسی در بلندمدت.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Model */}
        <section id="model" className="py-10">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-2xl m-0">مدل امنیتی و عملیاتی دیپاد</h3>
              <span className="text-sm text-[#9aa0b6]">چطور کار می‌کنیم؟</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                <h4 className="text-lg">رمزنگاری دولایه + Sharding</h4>
                <p className="text-[#9aa0b6] mt-2">فایل‌ها به بسته‌های رمزنگاری‌شده تقسیم می‌شوند؛ کلیدها به‌صورت تفکیکی نگهداری می‌شوند تا حتی در بدترین سناریو نیز ریسک افشا کاهش یابد.</p>
                <ul className="text-[#9aa0b6] mt-3 list-disc list-inside">
                  <li>احراز چندمرحله‌ای برای بازیابی</li>
                  <li>گزارش آفلاین‌شدن بسته‌ها</li>
                  <li>ردیابی و لاگ مسیر انتقال</li>
                </ul>
              </div>

              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                <h4 className="text-lg">خزانه‌های آفلاین کنترل‌شده</h4>
                <p className="text-[#9aa0b6] mt-2">رسانه‌ها (HDD/Tape/Optical) در محیط‌های کنترل‌شده با سیاست‌های Retention و روتیشن نگهداری می‌شوند؛ دسترسی فیزیکی محدود و ثبت‌شده است.</p>
                <ul className="text-[#9aa0b6] mt-3 list-disc list-inside">
                  <li>بازبینی سلامت دوره‌ای</li>
                  <li>سناریوهای Disaster Recovery</li>
                  <li>SLA شفاف بر اساس طرح انتخابی</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="py-10">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-2xl m-0">تیم و مالکیت</h3>
              <span className="text-sm text-[#9aa0b6]">ما چه کسانی هستیم؟</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="grid grid-cols-[72px_1fr] gap-3 items-center bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-lg p-3">
                <img className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[rgba(255,255,255,0.14)]" src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2b?q=80&w=200&auto=format&fit=crop" alt="مدیرعامل" />
                <div>
                  <strong>علیرضا پورمهدی</strong>
                  <div className="text-sm text-[#9aa0b6]">مدیرعامل — رایان پرداز سیستم نور ایرانیان</div>
                  <div className="text-sm text-[#9aa0b6] mt-1">مالک ایده و کسب‌وکار دیپاد</div>
                </div>
              </div>

              <div className="grid grid-cols-[72px_1fr] gap-3 items-center bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-lg p-3">
                <img className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[rgba(255,255,255,0.14)]" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop" alt="رهبر محصول" />
                <div>
                  <strong>تیم محصول دیپاد</strong>
                  <div className="text-sm text-[#9aa0b6]">طراحی تجربه کاربری، امنیت محصول و عملیات نگهداری</div>
                  <div className="text-sm text-[#9aa0b6] mt-1">متشکل از متخصصان امنیت، زیرساخت و بایگانی</div>
                </div>
              </div>

              <div className="grid grid-cols-[72px_1fr] gap-3 items-center bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-lg p-3">
                <img className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[rgba(255,255,255,0.14)]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="مشاور حقوقی" />
                <div>
                  <strong>مشاوران حقوقی/انطباق</strong>
                  <div className="text-sm text-[#9aa0b6]">تدوین NDA/SLA و سیاست‌های Retention</div>
                  <div className="text-sm text-[#9aa0b6] mt-1">همکاری موردی بر اساس پروژه</div>
                </div>
              </div>
            </div>

            <p className="text-[#9aa0b6] mt-4">مالک اصلی ایده و کسب‌وکار: شرکت «رایان پرداز سیستم نور ایرانیان».</p>
          </div>
        </section>

        {/* Careers CTA */}
        <section id="careers" className="py-10">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="bg-[linear-gradient(135deg,rgba(130,77,238,0.18),rgba(33,225,184,0.12))] border border-[rgba(255,255,255,0.12)] rounded-[20px] p-6 grid md:grid-cols-[1fr_auto] gap-4 items-center">
              <div>
                <h3 className="m-0 text-xl">می‌خواهید به ساخت «ابرِ آفلاین» کمک کنید؟</h3>
                <p className="text-[#9aa0b6] mt-1">فرصت‌های همکاری در امنیت، DevOps، زیرساخت ذخیره‌سازی و حقوق/انطباق.</p>
              </div>
              <a className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[linear-gradient(135deg,#824dee,#351b67)] text-white" href="mailto:careers@dipad.example">ارسال رزومه</a>
            </div>
          </div>
        </section>

        {/* Contact / FAQ */}
        <section id="contact" className="py-10">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-2xl m-0">در تماس باشید</h3>
              <span className="text-sm text-[#9aa0b6]">سوال دارید؟ بپرسید.</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ContactForm/>

              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-4">
                <h4 className="text-lg">سوالات کوتاه</h4>
                <details className="mt-3">
                  <summary className="cursor-pointer">آیا رسانه را خودمان می‌توانیم انتخاب کنیم؟</summary>
                  <p className="text-[#9aa0b6] mt-2">بله؛ بر اساس بودجه، دوام مورد انتظار و سیاست انطباق، یکی یا ترکیبی از HDD/Tape/Optical پیشنهاد می‌شود.</p>
                </details>

                <details className="mt-3">
                  <summary className="cursor-pointer">زمان بازیابی چقدر است؟</summary>
                  <p className="text-[#9aa0b6] mt-2">بسته به طرح، از ۱ تا ۵ روز کاری (امکان دسترسی اضطراری در طرح سازمانی).</p>
                </details>

                <details className="mt-3">
                  <summary className="cursor-pointer">حفظ محرمانگی چگونه تضمین می‌شود؟</summary>
                  <p className="text-[#9aa0b6] mt-2">NDA، مدیریت کلید تفکیکی و کنترل‌های دسترسی ثبت‌شده؛ گزارش آفلاین‌شدن بسته‌ها صادر می‌شود.</p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
