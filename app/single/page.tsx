"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function PostPage() {
const progressRef = useRef<HTMLDivElement | null>(null);
const postRef = useRef<HTMLElement | null>(null);
const contentRef = useRef<HTMLDivElement | null>(null);
const sheetRef = useRef<HTMLDialogElement | null>(null);
  const [tocItems, setTocItems] = useState<{ id: string; text: string }[]>([]);

  // open/close mobile sheet
  useEffect(() => {
    const openBtn = document.getElementById("openMenu");
    const closeBtn = document.getElementById("closeMenu");
    const sheet = sheetRef.current;
    if (!openBtn) return;
    const handleOpen = () => {
      try { sheet?.showModal(); } catch { /* ignore */ }
    };
    const handleClose = () => {
      try { sheet?.close(); } catch { /* ignore */ }
    };
    openBtn.addEventListener("click", handleOpen);
    closeBtn?.addEventListener("click", handleClose);
    return () => {
      openBtn.removeEventListener("click", handleOpen);
      closeBtn?.removeEventListener("click", handleClose);
    };
  }, []);

  // smooth anchor handler (also close sheet)
  useEffect(() => {
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

  // reading progress
  useEffect(() => {
    const el = postRef.current;
    const prog = progressRef.current;
    if (!el || !prog) return;
    let rafId: number | null = null;

    const onScroll = () => {
      // compute progress: position of viewport relative to post
      const top = el.offsetTop;
      const total = el.offsetHeight - window.innerHeight + 120; // approximate like original
      const scRaw = Math.min(Math.max((window.scrollY - top + 60) / (total || 1), 0), 1);
      // apply with transform scaleX
      prog.style.transform = `scaleX(${scRaw})`;
    };

    const listener = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    document.addEventListener("scroll", listener, { passive: true });
    window.addEventListener("load", onScroll);
    // initial
    onScroll();

    return () => {
      document.removeEventListener("scroll", listener);
      window.removeEventListener("load", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // build TOC from content headings
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const heads = Array.from(content.querySelectorAll("h2, h3")) as HTMLElement[];
    const items: { id: string; text: string }[] = heads.map((h) => {
      if (!h.id) {
        // create safe id
        const id = h.textContent?.trim().replace(/\s+/g, "-") || Math.random().toString(36).slice(2);
        h.id = id;
      }
      return { id: h.id, text: h.textContent || "" };
    });
    setTocItems(items);
  }, []);

  const copyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(location.href);
      (e.currentTarget as HTMLAnchorElement).textContent = "لینک کپی شد";
    } catch {
      alert("کپی ناموفق بود");
    }
  };

  return (
    <>
      <Head>
        <title>راهنمای جامع: HDD، Tape یا Optical؟ | وبلاگ دیپاد</title>
        <meta name="description" content="مقایسه عملی HDD، Tape و Optical برای آرشیو آفلاین بلندمدت: دوام، هزینه، سرعت بازیابی، و سناریوهای پیشنهادی." />
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: "راهنمای جامع: HDD، Tape یا Optical؟",
              author: { "@type": "Organization", name: "دیپاد" },
              datePublished: "2025-08-05",
              image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
              publisher: { "@type": "Organization", name: "دیپاد" },
            }),
          }}
        />
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
        {/* progress bar */}
        <div ref={progressRef} id="progress" className="fixed inset-x-0 top-0 h-[3px] origin-left z-40" style={{ background: "linear-gradient(90deg,#824dee,#351b67)", transform: "scaleX(0)" }} />

        {/* Post header */}
        <div className="post-head">
          <div className="max-w-[1200px] mx-auto px-5 py-4">
            <div className="text-sm text-[#9aa0b6]">
              <a href="/" className="text-[#cfd6ff]">خانه</a> <span className="mx-2">/</span> <a href="/blog" className="text-[#cfd6ff]">وبلاگ</a> <span className="mx-2">/</span> <span>راهنمای جامع: HDD، Tape یا Optical؟</span>
            </div>

            <h1 className="mt-3 font-extrabold" style={{ fontSize: "clamp(1.4rem,2.2vw + 1rem,2.6rem)" }}>
              راهنمای جامع: HDD، Tape یا Optical؟ کدام برای آرشیو بلندمدت بهتر است؟
            </h1>

            <div className="flex flex-wrap gap-3 items-center text-[#cfd6ff] text-sm mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs" style={{ background: "rgba(130,77,238,0.12)", border: "1px solid rgba(130,77,238,0.35)" }}>راهنما</span>
              <span>۱۴ مرداد ۱۴۰۴</span>
              <span>•</span>
              <span>زمان مطالعه: ۸ دقیقه</span>
              <span>•</span>
              <span>نویسنده: تیم دیپاد</span>
            </div>

            <div className="mt-4 rounded-[18px] overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop" alt="هارد، نوار و دیسک اپتیکال کنار هم" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>

        {/* Main */}
        <main className="max-w-[1200px] mx-auto px-5 py-6">
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Article */}
            <article ref={postRef} id="post" className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] overflow-hidden">
              <div ref={contentRef} id="content" className="p-6 prose prose-invert max-w-none">
                <h2 id="intro">مقدمه</h2>
                <p>انتخاب رسانه مناسب برای آرشیو آفلاینِ چندساله، تعادل میان هزینه، دوام، و دسترسی‌پذیری است. در این راهنما به‌صورت کاربردی مزایا و محدودیت‌های <strong>HDD</strong>، <strong>Tape</strong> و <strong>Optical</strong> را مرور می‌کنیم و در پایان چند سناریوی پیشنهادی می‌دهیم.</p>

                <h2 id="hdd">HDD: دسترسی سریع، نیازمند روتیشن</h2>
                <ul>
                  <li>مزایا: دسترسی نسبتاً سریع، سازگاری وسیع، هزینه اولیه مناسب.</li>
                  <li>محدودیت‌ها: حساس به شوک/رطوبت/دمای نامناسب؛ نیاز به تست دوره‌ای و <em>روتیشن ۱۲–۱۸ ماهه</em>.</li>
                </ul>
                <div className="bg-[rgba(33,225,184,0.1)] border border-[rgba(33,225,184,0.25)] p-3 rounded-lg inline-block text-sm">نکته: برای آرشیوهای فعال که گه‌گاه بازیابی نیاز دارند، HDD انتخاب رایجی است.</div>

                <h2 id="tape" className="mt-6">Tape: اقتصادی برای حجم‌های بالا</h2>
                <ul>
                  <li>مزایا: هزینه به‌صرفه برای ده‌ها ترابایت به بالا، دوام مناسب در شرایط استاندارد، مناسب بایگانی سرد.</li>
                  <li>محدودیت‌ها: دسترسی کندتر، نیاز به درایو/کتابخانه مخصوص، فرایند بازیابی کنترل‌شده.</li>
                </ul>

                <h2 id="optical" className="mt-6">Optical: پایداری طولانی، ظرفیت محدود</h2>
                <ul>
                  <li>مزایا: ایمن در برابر نویزهای الکترومغناطیسی، عمر طولانی در شرایط مطلوب، فقط-خواندنی (WORM) در برخی فرمت‌ها.</li>
                  <li>محدودیت‌ها: ظرفیت کمتر نسبت به HDD/Tape، سرعت نوشتن پایین‌تر.</li>
                </ul>

                <h2 id="hybrid" className="mt-6">سناریوهای ترکیبی پیشنهادی</h2>
                <p>ترکیب رسانه‌ها اغلب بهترین نتیجه را می‌دهد:</p>
                <ul>
                  <li><strong>فعال + بلندمدت:</strong> نسخه کاری روی HDD + کپی بایگانی روی Tape.</li>
                  <li><strong>حساسیت قانونی:</strong> Optical با قابلیت WORM + گزارش یکپارچگی.</li>
                  <li><strong>بودجه محدود:</strong> HDD با روتیشن منظم + تست سلامت دوره‌ای.</li>
                </ul>

                <h2 id="security" className="mt-6">امنیت و مدیریت کلید</h2>
                <p>در دیپاد، داده‌ها <strong>دولایه رمزنگاری</strong> می‌شوند و سپس به بسته‌های جداگانه (<em>Sharding</em>) تقسیم می‌گردند. مدیریت کلید تفکیکی است تا ریسک افشا کاهش یابد.</p>

                <h2 id="summary" className="mt-6">جمع‌بندی</h2>
                <blockquote className="border-l-4 border-[#824dee] bg-[rgba(130,77,238,0.08)] p-3 rounded-md text-[#e8e8ff]">اگر بازیابی نسبتاً سریع می‌خواهید، HDD. اگر صرفه اقتصادی در مقیاس بزرگ مهم است، Tape. اگر پایداری حقوقی/بلندمدت کلید است، Optical. در بسیاری سناریوها، راه‌حل ترکیبی برنده است.</blockquote>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("اشتراک (نمونه)"); }} className="px-3 py-2 rounded-full border border-[rgba(255,255,255,0.14)]">تلگرام ↗</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("اشتراک (نمونه)"); }} className="px-3 py-2 rounded-full border border-[rgba(255,255,255,0.14)]">لینکدین ↗</a>
                  <a href="#" onClick={copyLink} className="px-3 py-2 rounded-full border border-[rgba(255,255,255,0.14)]">کپی لینک</a>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-[64px_1fr] gap-3 items-center bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-lg p-3">
                  <img className="w-16 h-16 rounded-full object-cover border-2 border-[rgba(255,255,255,0.14)]" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="نویسنده" />
                  <div>
                    <strong>تیم دیپاد</strong>
                    <div className="text-sm text-[#9aa0b6]">ما درباره آرشیو امن آفلاین، بهترین روش‌ها و تجربیات می‌نویسیم.</div>
                  </div>
                </div>
              </div>
            </article>

            {/* TOC + newsletter sidebar */}
            <aside className="sidebar">
              <div className="sticky top-24 space-y-4">
                <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4">
                <h4 className="mb-2 font-semibold">فهرست مطالب</h4>
                <nav className="flex flex-col gap-1">
                  {tocItems.length ? tocItems.map((t) => (
                    <a key={t.id} href={`#${t.id}`} className="text-[#cfd6ff] text-sm hover:underline"><small className="text-[#9aa0b6] mr-1">•</small>{t.text}</a>
                  )) : (
                    <>
                      <a href="#intro" className="text-[#cfd6ff]">مقدمه</a>
                      <a href="#hdd" className="text-[#cfd6ff]">HDD</a>
                      <a href="#tape" className="text-[#cfd6ff]">Tape</a>
                    </>
                  )}
                </nav>
              </div>

              <div className="bg-[linear-gradient(135deg,rgba(130,77,238,0.18),rgba(33,225,184,0.12))] border border-[rgba(255,255,255,0.12)] rounded-[18px] p-4">
                <h4 className="font-semibold">خبرنامه</h4>
                <p className="text-sm text-[#9aa0b6] mt-2">مقالات جدید را در ایمیل بگیرید.</p>
                <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); alert("ارسال نمونه است"); }}>
                  <input className="flex-1 bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2 text-sm" type="email" placeholder="ایمیل شما" required />
                  <button className="px-3 py-2 rounded-lg bg-[linear-gradient(135deg,#824dee,#351b67)] text-white">عضویت</button>
                </form>
              </div>
              </div>
            </aside>
          </div>

          {/* Related */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-3">مطالب مرتبط</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {[
                { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop", title: "چرا SLA واقعی بدون گزارش سلامت معنا ندارد؟" },
                { img: "https://images.unsplash.com/photo-1544198365-3c4b5b2e21cb?q=80&w=1200&auto=format&fit=crop", title: "مطالعه موردی: مهاجرت آرشیو یک استودیو" },
                { img: "https://images.unsplash.com/photo-1524169358666-79f22534bc6e?q=80&w=1200&auto=format&fit=crop", title: "چرا قطع اتصال بهترین دفاع است؟" },
              ].map((r, i) => (
                <a key={i} className="block rounded-[12px] overflow-hidden border border-[rgba(255,255,255,0.08)]" href="#">
                  <img className="w-full object-cover aspect-[16/9]" src={r.img} alt={r.title} />
                  <div className="p-3"><strong>{r.title}</strong></div>
                </a>
              ))}
            </div>
          </section>

          {/* Prev/Next */}
          <div className="flex justify-between gap-4 mt-6">
            <a className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.12)]" href="#">« پست قبلی</a>
            <a className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.12)]" href="#">پست بعدی »</a>
          </div>

          {/* Comments */}
          <section id="comments" className="mt-6">
            <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.08)] rounded-[12px] p-4">
              <div className="flex items-center justify-between">
                <h3 className="m-0">دیدگاه‌ها</h3>
                <span className="text-sm text-[#9aa0b6]">0 دیدگاه</span>
              </div>

              <form className="mt-4" onSubmit={(e) => { e.preventDefault(); alert("ارسال دیدگاه در نسخه نمونه فعال نیست"); }}>
                <div className="grid md:grid-cols-2 gap-3">
                  <input className="bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" placeholder="نام" required />
                  <input className="bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" type="email" placeholder="ایمیل" required />
                </div>
                <textarea className="w-full mt-3 bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" rows={5} placeholder="نظر شما" />
                <div className="flex items-center gap-3 mt-3">
                  <button className="px-4 py-2 rounded-lg bg-[linear-gradient(135deg,#824dee,#351b67)] text-white">ارسال دیدگاه</button>
                  <span className="text-sm text-[#9aa0b6]">ایمیل شما منتشر نخواهد شد.</span>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
