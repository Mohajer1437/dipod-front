"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';


type TokenPayload = {
  userId: number;
  phone: string;
  role: string;
  iat: number;
  exp: number;
};

export default function Page() {
  const router = useRouter();

  const [step, setStep] = useState<"phone" | "otp">("phone");

  // Inputs refs
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const agreeRef = useRef<HTMLInputElement | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  // States
  const [canSend, setCanSend] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [verifyEnabled, setVerifyEnabled] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [leftSeconds, setLeftSeconds] = useState<number>(0);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const timerId = useRef<number | null>(null);

  // 🔔 اعلان‌ها
  const [toast, setToast] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: null, message: "" }), 3000);
  };

  // Helpers
  const validPhone = (v?: string) => /^0?9\d{9}$/.test((v || "").trim());
  const maskPhone = (v?: string) => {
    if (!v) return "";
    const s = v.trim().replace(/^\+98/, "0");
    return s.replace(/^0?9(\d{2})(\d{3})(\d{4})$/, (_m, a, b, c) => `0${a}-${b}-${c}`);
  };
  const formatTime = (sec: number) =>
    `${Math.floor(sec / 60).toString().padStart(2, "0")}:${(sec % 60)
      .toString()
      .padStart(2, "0")}`;

  // Update Send button
  const updateSendState = () => {
    const phone = phoneRef.current?.value || "";
    const agree = !!agreeRef.current?.checked;
    setCanSend(validPhone(phone) && agree);
  };

  // OTP change
  useEffect(() => {
    setVerifyEnabled(otpValue.length === 6);
  }, [otpValue]);

  // Timer effect
  useEffect(() => {
    if (leftSeconds <= 0) {
      if (timerId.current) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
      setResendEnabled(true);
      return;
    }
    setResendEnabled(false);
    if (!timerId.current) {
      timerId.current = window.setInterval(
        () => setLeftSeconds((s) => (s <= 1 ? 0 : s - 1)),
        1000
      );
    }
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, [leftSeconds]);

  // Send OTP
  const handleSendOtp = async () => {
    setErrorVisible(false);
    const phone = phoneRef.current?.value?.trim() || "";
    const pv = phoneRef.current?.value?.trim() || "";
    if (!validPhone(phone)) return;
    setPhone(pv);

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();

    if (!res.ok) {
      showToast("error", data.error || "خطا در ارسال کد تأیید");
      return;
    }

    showToast("success", data.message || "کد تأیید ارسال شد");
    setMaskedPhone(maskPhone(phone));
    setStep("otp");

    otpRefs.current.forEach((i) => i && (i.value = ""));
    setOtpValue("");
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
    setLeftSeconds(90);
  };

  // Change phone
  const handleChangePhone = () => {
    setStep("phone");
    setErrorVisible(false);
    setLeftSeconds(0);
    setTimeout(() => phoneRef.current?.focus(), 50);
  };

  // Resend
  const handleResend = () => {
    otpRefs.current.forEach((i) => i && (i.value = ""));
    setOtpValue("");
    setErrorVisible(false);
    setLeftSeconds(90);
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  // OTP input handlers
  const onOtpInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 1);
    e.target.value = v;
    if (v && idx < otpRefs.current.length - 1) {
      otpRefs.current[idx + 1]?.focus();
    }
    setOtpValue(otpRefs.current.map((i) => i?.value || "").join(""));
    setErrorVisible(false);
  };
  const onOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < otpRefs.current.length - 1) {
      otpRefs.current[idx + 1]?.focus();
    }
  };
  const onOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length) {
      e.preventDefault();
      otpRefs.current.forEach((inp, i) => inp && (inp.value = digits[i] || ""));
      setOtpValue(digits.join(""));
      setErrorVisible(false);
    }
  };


  const { refreshUser } = useAuth();
  
  // Verify
  const handleVerify = async () => {
    const code = otpRefs.current.map((i) => i?.value || "").join("");
    if (!validPhone(phone) || code.length !== 6) return;

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp: code }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      // 👇 این خط باعث میشه Header بلافاصله آپدیت بشه
      await refreshUser();

      if (data.user?.role === 'admin') {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    } else {
      setErrorVisible(true);
    }
  };


  return (
    <>
      <Head>
        <title>ورود / ثبت‌نام با موبایل | دیپاد</title>
        <meta
          name="description"
          content="ورود یا ثبت‌نام سریع در دیپاد با شماره موبایل و کد یک‌بارمصرف (OTP)."
        />
        <meta name="color-scheme" content="light dark" />
      </Head>

      <div
        className="min-h-[100dvh] grid place-items-center px-4"
        dir="rtl"
        lang="fa"
        style={{
          background:
            "radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,.14), transparent 60%), radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,.15), transparent 60%), #0b0b12",
          color: "#f5f7ff",
          fontFamily: "IRANSans, Vazirmatn, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div className="w-full max-w-[440px] p-5">
          <div
            className="rounded-[18px] overflow-hidden"
            role="dialog"
            aria-labelledby="title"
            aria-describedby="desc"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
              border: "1px solid rgba(255,255,255,.08)",
              boxShadow: "0 10px 30px rgba(0,0,0,.25)",
            }}
          >
            {/* Step Phone */}
            {step === "phone" && (
              <section className="p-4">
                <div className="grid gap-3">
                  <label className="text-sm">شماره موبایل</label>
                  <input
                    ref={phoneRef}
                    inputMode="tel"
                    dir="ltr"
                    placeholder="09xxxxxxxxx"
                    className="w-full bg-[#0f0f1a] border rounded-lg px-3 py-3 text-[#f5f7ff] border-[rgba(255,255,255,0.14)]"
                    onInput={updateSendState}
                  />
                  <div className="text-sm text-[#9aa0b6]">
                    با وارد کردن شماره، اگر حساب داشته باشید وارد می‌شوید؛ اگر
                    نداشته باشید، پس از تایید کد برایتان حساب ساخته می‌شود.
                  </div>
                  <label className="flex gap-2 items-start text-sm">
                    <input
                      ref={agreeRef}
                      type="checkbox"
                      onChange={updateSendState}
                      className="mt-1"
                    />
                    <span>
                      می‌پذیرم که با{" "}
                      <a href="/privacy" className="text-[#cfd6ff] underline">
                        حریم خصوصی
                      </a>{" "}
                      و{" "}
                      <a href="/terms" className="text-[#cfd6ff] underline">
                        شرایط استفاده
                      </a>{" "}
                      موافقم.
                    </span>
                  </label>
                  <button
                    onClick={handleSendOtp}
                    disabled={!canSend}
                    className={`w-full rounded-lg px-4 py-3 ${canSend ? "" : "opacity-60 cursor-not-allowed"
                      }`}
                    style={{
                      background: "linear-gradient(135deg,#824dee,#351b67)",
                      color: "#fff",
                    }}
                  >
                    دریافت کد تأیید
                  </button>
                </div>
              </section>
            )}

            {/* Step OTP */}
            {step === "otp" && (
              <section className="p-4">
                <div className="grid gap-3">
                  <div className="flex justify-between items-center">
                    <div>
                      کد ارسال‌شده به <strong>{maskedPhone}</strong> را وارد کنید.
                    </div>
                    <button onClick={handleChangePhone} className="rounded-lg px-3 py-2 border">
                      تغییر شماره
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2" dir="ltr">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <input
                        key={i}
                        ref={(el: HTMLInputElement | null) => {
                          otpRefs.current[i] = el;
                        }}
                        type="tel"
                        maxLength={1}
                        inputMode="numeric"
                        onChange={(e) => onOtpInput(e, i)}
                        onKeyDown={(e) => onOtpKeyDown(e, i)}
                        onPaste={onOtpPaste}
                        className="aspect-square text-center text-lg bg-[#0f0f1a] border rounded-lg text-[#f5f7ff] border-[rgba(255,255,255,0.16)]"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#9aa0b6]">
                      زمان باقیمانده:{" "}
                      <span className="font-mono">{formatTime(leftSeconds)}</span>
                    </span>
                    <button
                      onClick={handleResend}
                      disabled={!resendEnabled}
                      className={`rounded-lg px-3 py-2 ${resendEnabled ? "" : "opacity-60 cursor-not-allowed"
                        }`}
                    >
                      ارسال مجدد
                    </button>
                  </div>
                  {errorVisible && (
                    <div className="bg-red-500/10 text-red-300 p-2 rounded-lg text-sm">
                      کد نادرست است. دوباره تلاش کنید.
                    </div>
                  )}
                  <button
                    onClick={handleVerify}
                    disabled={!verifyEnabled}
                    className={`w-full rounded-lg px-4 py-3 ${verifyEnabled ? "" : "opacity-60 cursor-not-allowed"
                      }`}
                    style={{
                      background: "linear-gradient(135deg,#824dee,#351b67)",
                      color: "#fff",
                    }}
                  >
                    تایید و ورود
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* 🔔 اعلان‌ها */}
        {toast.type && (
          <div
            className={`
              fixed bottom-5 left-1/2 -translate-x-1/2
              px-5 py-3 rounded-xl text-sm font-medium
              shadow-[0_8px_24px_rgba(0,0,0,0.35)]
              backdrop-blur-md transition-all duration-300
              ${toast.type === "success"
                ? "bg-green-500/20 border border-green-400/40 text-green-200"
                : "bg-red-500/20 border border-red-400/40 text-red-200"
              }
            `}
          >
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
}
