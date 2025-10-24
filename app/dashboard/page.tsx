"use client";

import { useEffect, useRef, useState } from "react";

export default function Page() {
  // فرم / مودال state
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const priorityRef = useRef<HTMLSelectElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);

  const openRequest = (id?: string) => {
    if (!dialogRef.current) return;
    try {
      // showModal ممکنه در همه مرورگرها پشتیبانی نشه اما در اغلب مدرن‌ها هست
      dialogRef.current.showModal();
    } catch {
      // fallback
      dialogRef.current.setAttribute("open", "true");
    }
    if (id && titleRef.current && typeRef.current) {
      titleRef.current.value = `پیگیری درخواست ${id}`;
      typeRef.current.value = "بازیابی داده";
    }
  };

  const closeRequest = () => {
    if (!dialogRef.current) return;
    try {
      dialogRef.current.close();
    } catch {
      dialogRef.current.removeAttribute("open");
    }
  };

  const submitRequest = (e?: React.FormEvent) => {
    e?.preventDefault();
    // در نسخه نمونه فقط هشدار می‌دهیم مثل HTML نمونه
    closeRequest();
    alert("در نسخه نمونه، درخواست به سرور ارسال نمی‌شود.");
  };

  // handle ESC to close dialog
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeRequest();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div dir="rtl" lang="fa" className="min-h-screen bg-[radial-gradient(1200px_800px_at_90%_-10%,rgba(130,77,238,0.14),transparent_60%),radial-gradient(900px_600px_at_-10%_10%,rgba(53,27,103,0.15),transparent_60%),#0b0b12] text-[#f5f7ff]">
      <div className="grid grid-cols-[260px_minmax(0,1fr)] min-h-[100dvh]">
        {/* Sidebar */}
        <aside className="sticky top-0 h-[100dvh] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border-l border-r border-r-[rgba(255,255,255,0.04)] border-l-[rgba(255,255,255,0.08)]">
          <div className="flex flex-col gap-2 p-4 h-full">
            <a href="/" aria-label="Dipad Home" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-[12px] bg-[conic-gradient(from_210deg_at_50%_50%,_#824dee,_#351b67)] shadow-[0_6px_18px_rgba(130,77,238,0.45)]" aria-hidden />
              <strong className="text-base">دیپاد</strong>
            </a>

            <nav className="grid gap-1 mt-2" aria-label="Sidebar">
              <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff] bg-[rgba(130,77,238,0.14)] outline outline-1 outline-[rgba(130,77,238,0.35)]" href="#dashboard">
                <span>🏠</span>
                <span className="label">داشبورد</span>
              </a>

              {/* placeholder: in original there was $1 — keep removed or replace as needed */}
              {/* <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff]" href="#custom">🔗 <span className="label">مورد جدید</span></a> */}

              <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff]" href="#upload">⬆️ <span className="label">آپلود</span></a>
              <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff]" href="#download">⬇️ <span className="label">دانلود</span></a>
              <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff]" href="#identity">🪪 <span className="label">مدارک هویتی</span></a>
              <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff]" href="#requests">📨 <span className="label">درخواست‌ها</span></a>
              <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff]" href="#billing">💳 <span className="label">صورتحساب</span></a>
              <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff]" href="#settings">⚙️ <span className="label">تنظیمات</span></a>
              <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff]" href="#support">🛟 <span className="label">پشتیبانی</span></a>
            </nav>

            <div className="mt-auto bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#9aa0b6]">حجم مصرفی</span>
                <span className="inline-flex items-center gap-2 text-sm text-[#dbe4ff] bg-[rgba(130,77,238,0.12)] px-2 py-1 rounded-full border" style={{ borderColor: "rgba(130,77,238,0.35)" }}>200GB / 500GB</span>
              </div>
              <div className="mt-2 bg-[#0f0f1a] rounded-full h-2 overflow-hidden">
                <div className="h-full w-[40%] bg-[linear-gradient(90deg,#824dee,#351b67)]" />
              </div>
              <div className="mt-2 flex gap-2">
                <a className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.14)]" href="#upgrade">ارتقا پلن</a>
                <a className="inline-flex items-center gap-2 px-3 py-2 rounded-full" href="#usage">جزئیات</a>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-50 backdrop-filter backdrop-saturate-150 backdrop-blur-md bg-[linear-gradient(180deg,rgba(11,11,18,0.85),rgba(11,11,18,0.65))] border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between gap-3 p-3">
              <form className="flex gap-2 grow" onSubmit={(e) => { e.preventDefault(); alert("جستجو در نسخه نمونه فعال نیست"); }}>
                <input className="flex-1 bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] text-[#f5f7ff] rounded-lg px-3 py-2" placeholder="جستجو در بسته‌ها، درخواست‌ها…" />
                <button className="ml-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" type="submit">جستجو</button>
              </form>

              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-full border border-[rgba(255,255,255,0.12)]" onClick={() => openRequest()}>+ ثبت درخواست</button>
                <button className="px-3 py-2 rounded-full" onClick={() => alert("اعلان‌ها در نسخه نمونه فعال نیست")}>🔔</button>
                <img className="w-9 h-9 rounded-full object-cover border-2 border-[rgba(255,255,255,0.18)]" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="کاربر" />
              </div>
            </div>
          </header>

          <main className="max-w-[1280px] w-full mx-auto p-4">
            <div className="flex items-center justify-between gap-3 p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,rgba(130,77,238,0.18),rgba(33,225,184,0.10))]">
              <div>
                <h2 className="text-2xl font-semibold mb-1">سلام! به پنل دیپاد خوش آمدید</h2>
                <p className="text-sm text-[#9aa0b6] m-0">خلاصه وضعیت شما در یک نگاه. برای شروع، می‌توانید از همین‌جا <strong>ثبت درخواست</strong> کنید.</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 rounded-full bg-[linear-gradient(135deg,#824dee,#351b67)] shadow-[0_8px_24px_rgba(130,77,238,0.35)]" onClick={() => openRequest()}>+ ثبت درخواست</button>
                <a className="px-4 py-2 rounded-full border border-[rgba(255,255,255,0.14)]" href="#files">آپلود امن</a>
              </div>
            </div>

            {/* Stats */}
            <section className="grid gap-3 mt-3 grid-cols-4 md:grid-cols-2">
              <div className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <div className="text-sm text-[#9aa0b6]">درخواست‌های باز</div>
                <div className="text-2xl font-black">2</div>
                <div className="inline-block mt-2 px-2 py-1 rounded-full text-sm" style={{ background: "rgba(130,77,238,0.18)", border: "1px solid rgba(130,77,238,0.35)" }}>در انتظار بررسی</div>
              </div>

              <div className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <div className="text-sm text-[#9aa0b6]">بسته‌های آفلاین</div>
                <div className="text-2xl font-black">14</div>
                <div className="text-sm text-[#9aa0b6] mt-2">آخرین بازبینی: 3 روز پیش</div>
              </div>

              <div className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <div className="text-sm text-[#9aa0b6]">بازیابی‌های انجام‌شده</div>
                <div className="text-2xl font-black">5</div>
                <div className="inline-block mt-2 px-2 py-1 rounded-full text-sm" style={{ background: "rgba(33,225,184,0.18)", border: "1px solid rgba(33,225,184,0.4)" }}>همه موفق</div>
              </div>

              <div className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <div className="text-sm text-[#9aa0b6]">صورت‌حساب‌های معوق</div>
                <div className="text-2xl font-black">0</div>
                <div className="inline-block mt-2 px-2 py-1 rounded-full text-sm" style={{ background: "rgba(33,225,184,0.18)", border: "1px solid rgba(33,225,184,0.4)" }}>وضعیت مالی: سالم</div>
              </div>
            </section>

            {/* Two columns: requests / media status */}
            <section className="grid gap-3 mt-3 md:grid-cols-2">
              <div className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="m-0">درخواست‌های اخیر</h3>
                  <a className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)]" href="#requests">همه</a>
                </div>
                <table className="w-full table-fixed">
                  <thead>
                    <tr>
                      <th className="text-right pr-2">شناسه</th>
                      <th className="text-right pr-2">نوع</th>
                      <th className="text-right pr-2">اولویت</th>
                      <th className="text-right pr-2">وضعیت</th>
                      <th className="text-right pr-2">تاریخ</th>
                      <th className="text-right pr-2">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-[rgba(255,255,255,0.02)]">
                      <td className="py-2 text-right">#R-1042</td>
                      <td className="py-2 text-right">بازیابی داده</td>
                      <td className="py-2 text-right">بالا</td>
                      <td className="py-2 text-right"><span className="inline-block px-2 py-1 rounded-full" style={{ background: "rgba(130,77,238,0.18)", border: "1px solid rgba(130,77,238,0.35)" }}>درحال پردازش</span></td>
                      <td className="py-2 text-right">۱۴۰۴/۰۵/۱۴</td>
                      <td className="py-2 text-right"><button className="px-3 py-1 rounded-full" onClick={() => openRequest("R-1042")}>مشاهده</button></td>
                    </tr>
                    <tr className="hover:bg-[rgba(255,255,255,0.02)]">
                      <td className="py-2 text-right">#R-1041</td>
                      <td className="py-2 text-right">مشاوره رسانه</td>
                      <td className="py-2 text-right">متوسط</td>
                      <td className="py-2 text-right"><span className="inline-block px-2 py-1 rounded-full" style={{ background: "rgba(33,225,184,0.18)", border: "1px solid rgba(33,225,184,0.4)" }}>انجام شد</span></td>
                      <td className="py-2 text-right">۱۴۰۴/۰۵/۱۰</td>
                      <td className="py-2 text-right"><button className="px-3 py-1 rounded-full" onClick={() => openRequest("R-1041")}>جزئیات</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="m-0">وضعیت رسانه‌ها</h3>
                  <a className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)]" href="#files">مدیریت</a>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center"><span className="text-sm text-[#9aa0b6]">HDD</span><span className="inline-flex items-center gap-2 text-sm text-[#dbe4ff] bg-[rgba(130,77,238,0.12)] px-2 py-1 rounded-full border" style={{ borderColor: "rgba(130,77,238,0.35)" }}>آخرین تست: ۱۲ روز پیش</span></div>
                  <div className="h-2 bg-[#0f0f1a] rounded-full overflow-hidden"><div className="h-full w-[65%] bg-[linear-gradient(90deg,#824dee,#351b67)]" /></div>

                  <div className="flex justify-between items-center"><span className="text-sm text-[#9aa0b6]">Tape</span><span className="inline-flex items-center gap-2 text-sm text-[#dbe4ff] bg-[rgba(130,77,238,0.12)] px-2 py-1 rounded-full border" style={{ borderColor: "rgba(130,77,238,0.35)" }}>آخرین تست: ۳۵ روز پیش</span></div>
                  <div className="h-2 bg-[#0f0f1a] rounded-full overflow-hidden"><div className="h-full w-[40%] bg-[linear-gradient(90deg,#824dee,#351b67)]" /></div>

                  <div className="flex justify-between items-center"><span className="text-sm text-[#9aa0b6]">Optical</span><span className="inline-flex items-center gap-2 text-sm text-[#dbe4ff] bg-[rgba(130,77,238,0.12)] px-2 py-1 rounded-full border" style={{ borderColor: "rgba(130,77,238,0.35)" }}>آخرین تست: ۲۰ روز پیش</span></div>
                  <div className="h-2 bg-[#0f0f1a] rounded-full overflow-hidden"><div className="h-full w-[20%] bg-[linear-gradient(90deg,#824dee,#351b67)]" /></div>
                </div>
              </div>
            </section>

            {/* Quick actions Upload/Download */}
            <section id="upload" className="grid gap-3 mt-3 md:grid-cols-2">
              <div className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="m-0">⬆️ آپلود امن</h3>
                  <button className="px-3 py-1 rounded-full" onClick={() => alert("آپلود نمونه است")}>شروع آپلود</button>
                </div>
                <p className="text-sm text-[#9aa0b6]">فایل‌ها را آپلود کنید تا به‌صورت دولایه رمزنگاری و به بسته‌ها تقسیم شوند. پس از تکمیل، بسته‌ها به خزانه آفلاین منتقل می‌شوند.</p>
                <ul className="text-sm text-[#9aa0b6] mt-2 list-disc pr-4">
                  <li>ازسرگیری خودکار آپلود</li>
                  <li>انقضای لینک موقت</li>
                  <li>گزارش لحظه‌ای وضعیت رمزنگاری</li>
                </ul>
              </div>

              <div id="download" className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="m-0">⬇️ دانلود / بازیابی</h3>
                  <button className="px-3 py-1 rounded-full border" onClick={() => openRequest()}>درخواست بازیابی</button>
                </div>
                <p className="text-sm text-[#9aa0b6]">برای دریافت فایل‌ها، یک درخواست بازیابی ثبت کنید. پس از احراز چندمرحله‌ای و آماده‌سازی، لینک/تحویل امن ارائه می‌شود.</p>
                <ul className="text-sm text-[#9aa0b6] mt-2 list-disc pr-4">
                  <li>پیگیری وضعیت درخواست</li>
                  <li>گزینهٔ تحویل آنلاین/فیزیکی</li>
                  <li>ثبت لاگ دسترسی و دانلود</li>
                </ul>
              </div>
            </section>

            {/* Identity card */}
            <section id="identity" className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] mt-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="m-0">🪪 مدارک هویتی</h3>
                <button className="px-3 py-1 rounded-full border" onClick={() => alert("آپلود مدارک در نسخه نمونه فعال نیست")}>بارگذاری مدرک</button>
              </div>
              <p className="text-sm text-[#9aa0b6]">برای فعال‌سازی کامل خدمات (مثل بازیابی‌های حساس)، تکمیل احراز هویت لازم است. مدارک شما به‌صورت رمزنگاری‌شده نگهداری می‌شود.</p>

              <table className="w-full mt-2">
                <thead>
                  <tr>
                    <th className="text-right pr-2">نوع مدرک</th>
                    <th className="text-right pr-2">وضعیت</th>
                    <th className="text-right pr-2">آخرین به‌روزرسانی</th>
                    <th className="text-right pr-2">اقدامات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="py-2 text-right">کارت ملی</td>
                    <td className="py-2 text-right"><span className="inline-block px-2 py-1 rounded-full" style={{ background: "rgba(255,193,7,0.15)", border: "1px solid rgba(255,193,7,0.35)" }}>ناقص</span></td>
                    <td className="py-2 text-right">—</td>
                    <td className="py-2 text-right"><button className="px-3 py-1 rounded-full" onClick={() => alert("آپلود نمونه است")}>آپلود</button></td>
                  </tr>
                  <tr className="hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="py-2 text-right">سلفی تطبیقی</td>
                    <td className="py-2 text-right"><span className="inline-block px-2 py-1 rounded-full" style={{ background: "rgba(130,77,238,0.18)", border: "1px solid rgba(130,77,238,0.35)" }}>در انتظار بررسی</span></td>
                    <td className="py-2 text-right">۱۴۰۴/۰۵/۱۴</td>
                    <td className="py-2 text-right"><button className="px-3 py-1 rounded-full" onClick={() => alert("مشاهده نمونه")}>مشاهده</button></td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Activity */}
            <section className="p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] mt-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="m-0">فعالیت اخیر</h3>
                <a className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)]" href="#logs">وقایع‌نگار</a>
              </div>
              <ul className="text-[#dfe4ff] list-none p-0 m-0">
                <li className="py-2 border-b border-dashed border-[rgba(255,255,255,0.08)]">📦 بسته A13 به خزانه آفلاین منتقل شد — <span className="text-[#9aa0b6]">۱۴۰۴/۰۵/۱۳ ۱۲:۴۵</span></li>
                <li className="py-2 border-b border-dashed border-[rgba(255,255,255,0.08)]">🧪 تست سلامت روی Tape-02 انجام شد — <span className="text-[#9aa0b6]">۱۴۰۴/۰۵/۱۲ ۰۹:۱۲</span></li>
                <li className="py-2">🔑 تأیید دومرحله‌ای برای درخواست R-1042 تکمیل شد — <span className="text-[#9aa0b6]">۱۴۰۴/۰۵/۱۲ ۰۸:۰۱</span></li>
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* Modal (dialog) */}
      <dialog ref={dialogRef} id="newReq" className="rounded-[16px] p-0 bg-[#121222] text-[#f5f7ff] w-[min(92vw,640px)] border-none">
        <div className="flex items-center justify-between p-3 border-b border-[rgba(255,255,255,0.08)]">
          <strong>ثبت درخواست</strong>
          <button className="px-2 py-1 rounded-full" onClick={closeRequest}>✕</button>
        </div>

        <form className="p-3" onSubmit={(e) => { submitRequest(e); }}>
          <div className="grid gap-3 grid-cols-2">
            <div>
              <label className="block mb-1" htmlFor="r-title">عنوان درخواست</label>
              <input id="r-title" ref={titleRef} className="w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" required placeholder="مثال: بازیابی بسته پروژه X" />
            </div>
            <div>
              <label className="block mb-1" htmlFor="r-type">نوع درخواست</label>
              <select id="r-type" ref={typeRef} className="w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" required defaultValue="">
                <option value="" disabled>انتخاب کنید…</option>
                <option>آپلود جدید</option>
                <option>بازیابی داده</option>
                <option>بررسی وضعیت رسانه</option>
                <option>مشاوره انتخاب رسانه/پلن</option>
              </select>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2 mt-3">
            <div>
              <label className="block mb-1" htmlFor="r-priority">اولویت</label>
              <select id="r-priority" ref={priorityRef} className="w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" required defaultValue="عادی">
                <option>عادی</option>
                <option>بالا</option>
                <option>اضطراری</option>
              </select>
            </div>
            <div>
              <label className="block mb-1" htmlFor="r-date">حداکثر زمان نیاز</label>
              <input id="r-date" ref={dateRef} type="date" className="w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="mt-3">
            <label className="block mb-1" htmlFor="r-desc">توضیحات</label>
            <textarea id="r-desc" ref={descRef} className="w-full bg-[#0f0f1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2" rows={4} placeholder="جزئیات بسته‌ها، شناسه‌ها، محدودیت‌های زمانی، مجوزهای لازم…" />
          </div>

          <div className="mt-3 flex gap-3 flex-wrap items-center">
            <label className="inline-flex items-center gap-2"><input type="checkbox" /> نیاز به NDA دارم</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" /> اجازه تماس تلفنی</label>
          </div>

          <div className="flex gap-2 mt-4 p-3 border-t border-[rgba(255,255,255,0.08)]">
            <button className="px-4 py-2 rounded-full bg-[linear-gradient(135deg,#824dee,#351b67)]" type="submit">ثبت</button>
            <button className="px-4 py-2 rounded-full border" type="button" onClick={closeRequest}>انصراف</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
