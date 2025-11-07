"use client";

import { useEffect, useState } from "react";
import ProtectedLayout from "./layout";
import { useAuth } from "@/app/context/AuthContext";

export default function Page() {
  const { user } = useAuth();
  const [hasRequest, setHasRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", family: "", email: "" });
  const [toast, setToast] = useState<string | null>(null);

  // بررسی وجود درخواست قبلی
  useEffect(() => {
    if (!user) return;
    fetch("/api/request", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const exists = data.find((r: any) => r.phone === user.phone);
        setHasRequest(!!exists);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // ارسال فرم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const res = await fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.trim(),
        family: form.family.trim(),
        email: form.email.trim(),
        phone: user.phone,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setToast("✅ درخواست شما با موفقیت ثبت شد.");
      setHasRequest(true);
    } else if (data.duplicate) {
      setToast("⚠️ شما قبلاً درخواست خود را ثبت کرده‌اید.");
      setHasRequest(true);
    } else {
      setToast("❌ خطا در ثبت درخواست. لطفاً مجدد تلاش کنید.");
    }

    setTimeout(() => setToast(null), 3000);
  };

  if (loading) return <div className="p-6 text-center text-gray-300">در حال بارگذاری...</div>;

  return (
    <ProtectedLayout>
      <div
        dir="rtl"
        lang="fa"
        className="min-h-screen bg-[radial-gradient(1200px_800px_at_90%_-10%,rgba(130,77,238,0.14),transparent_60%),radial-gradient(900px_600px_at_-10%_10%,rgba(53,27,103,0.15),transparent_60%),#0b0b12] text-[#f5f7ff]"
      >
        <div className="grid grid-cols-[260px_minmax(0,1fr)] min-h-[100dvh]">
          {/* Sidebar */}
          <aside className="sticky top-0 h-[100dvh] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] border-l border-r border-r-[rgba(255,255,255,0.04)] border-l-[rgba(255,255,255,0.08)]">
            <div className="flex flex-col gap-2 p-4 h-full">
              <a href="/" aria-label="Dipad Home" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-[12px] bg-[conic-gradient(from_210deg_at_50%_50%,_#824dee,_#351b67)] shadow-[0_6px_18px_rgba(130,77,238,0.45)]" aria-hidden />
                <strong className="text-base">دیپاد</strong>
              </a>

              <nav className="grid gap-1 mt-2" aria-label="Sidebar">
                <a
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#e6e9ff] bg-[rgba(130,77,238,0.14)] outline outline-1 outline-[rgba(130,77,238,0.35)]"
                  href="#dashboard"
                >
                  <span>🏠</span>
                  <span className="label">داشبورد</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex flex-col">
            <main className="max-w-[1280px] w-full mx-auto p-4">
              <h2 className="text-2xl font-semibold mb-4">داشبورد کاربری</h2>

              {/* 🔹 فرم درخواست نسخه آزمایشی */}
              <section className="p-6 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                {!hasRequest ? (
                  <div className="mx-auto block w-[400px]">
                    <h3 className="text-lg font-semibold mb-4">درخواست نسخه آزمایشی محصول</h3>
                    <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
                      <div>
                        <label className="block text-sm mb-1">نام</label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0f0f1a] border border-white/10 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">نام خانوادگی</label>
                        <input
                          value={form.family}
                          onChange={(e) => setForm({ ...form, family: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0f0f1a] border border-white/10 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">ایمیل</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0f0f1a] border border-white/10 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">شماره تلفن</label>
                        <input
                          value={user?.phone || ""}
                          readOnly
                          className="w-full px-3 py-2 rounded-lg bg-[#1b1b25] border border-white/10 text-gray-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-br from-[#824dee] to-[#351b67] text-white font-semibold py-3 rounded-full mt-2 transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(130,77,238,0.35)]"
                      >
                        درخواست نسخه آزمایشی
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <h3 className="text-lg font-semibold mb-2">✅ درخواست شما ثبت شده است</h3>
                    <p className="text-[#9aa0b6]">درخواست نسخه آزمایشی محصول شما در حال بررسی است.</p>
                  </div>
                )}
              </section>

              {/* 🔹 سایر بخش‌های داشبورد (در آینده فعال می‌شن) */}
              <section className="mt-6 p-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-[#9aa0b6]">
                <p>این بخش‌ها (درخواست‌ها، فایل‌ها، صورت‌حساب‌ها و...) بعداً فعال خواهند شد.</p>
              </section>
            </main>
          </div>
        </div>

        {/* Toast اعلان */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-[#151525] border border-white/10 text-white px-4 py-2 rounded-lg shadow-md animate-fade-in">
            {toast}
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}
