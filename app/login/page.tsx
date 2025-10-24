"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    // step: "phone" | "otp"
    const [step, setStep] = useState<"phone" | "otp">("phone");

    // phone form
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const agreeRef = useRef<HTMLInputElement | null>(null);
    const [canSend, setCanSend] = useState(false);

    // masked phone shown in OTP step
    const [maskedPhone, setMaskedPhone] = useState<string>("");

    // otp inputs refs
    const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [otpValue, setOtpValue] = useState<string>("");

    // verify / error
    const [verifyEnabled, setVerifyEnabled] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    // timer & resend
    const [leftSeconds, setLeftSeconds] = useState<number>(0);
    const [resendEnabled, setResendEnabled] = useState(false);
    const timerId = useRef<number | null>(null);

    // helpers: phone validation & mask
    const validPhone = (v?: string) => {
        const s = (v || "").trim();
        return /^0?9\d{9}$/.test(s);
    };
    const maskPhone = (v?: string) => {
        if (!v) return "";
        const s = v.trim();
        // normalize leading +98 -> 0...
        const m = s.replace(/^\+98/, "0");
        return m.replace(/^0?9(\d{2})(\d{3})(\d{4})$/, (_m, a, b, c) => `0${a}-${b}-${c}`);
    };

    // update canSend when phone or agree changes
    useEffect(() => {
        const onChange = () => {
            const phone = phoneRef.current?.value || "";
            const agree = !!agreeRef.current?.checked;
            setCanSend(validPhone(phone) && agree);
        };
        onChange(); // initial
        // no global listeners — inputs will call updateSendState directly via handlers
        // return nothing
    }, []);

    // update verifyEnabled when otpValue changes
    useEffect(() => {
        setVerifyEnabled(otpValue.length === 6);
    }, [otpValue]);

    // timer management
    useEffect(() => {
        if (leftSeconds <= 0) {
            if (timerId.current) {
                window.clearInterval(timerId.current);
                timerId.current = null;
            }
            setResendEnabled(true);
            return;
        }
        setResendEnabled(false);
        // start interval if not started
        if (!timerId.current) {
            timerId.current = window.setInterval(() => {
                setLeftSeconds((s) => {
                    if (s <= 1) {
                        if (timerId.current) {
                            window.clearInterval(timerId.current);
                            timerId.current = null;
                        }
                        return 0;
                    }
                    return s - 1;
                });
            }, 1000);
        }
        return () => {
            // do not clear here to allow continuous counting; cleanup on unmount
        };
    }, [leftSeconds]);

    useEffect(() => {
        return () => {
            if (timerId.current) window.clearInterval(timerId.current);
        };
    }, []);

    // format timer mm:ss
    const formatTime = (sec: number) => {
        const mm = Math.floor(sec / 60)
            .toString()
            .padStart(2, "0");
        const ss = (sec % 60).toString().padStart(2, "0");
        return `${mm}:${ss}`;
    };

    // send OTP button clicked
    const handleSendOtp = async () => {
        setErrorVisible(false);
        const pv = phoneRef.current?.value?.trim() || "";
        if (!validPhone(pv)) return;

        // call server
        const res = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: pv })
        });
        const data = await res.json();
        if (!data.success) {
            alert(data.error || 'خطا در ارسال OTP');
            return;
        }


        setMaskedPhone(maskPhone(pv));
        setStep("otp");

        // clear previous otp inputs
        otpRefs.current.forEach((i) => { if (i) i.value = ""; });
        setOtpValue("");
        setTimeout(() => otpRefs.current[0]?.focus(), 50);
        setLeftSeconds(90);
        setResendEnabled(false);
    };


    const handleChangePhone = () => {
        setStep("phone");
        setErrorVisible(false);
        setLeftSeconds(0);
        // allow send state to be re-evaluated by user interactions
        setTimeout(() => phoneRef.current?.focus(), 50);
    };

    // OTP input behaviors
    const onOtpInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 1);
        e.target.value = v;
        if (v && idx < otpRefs.current.length - 1) {
            otpRefs.current[idx + 1]?.focus();
        }
        const code = otpRefs.current.map((i) => (i?.value || "")).join("");
        setOtpValue(code);
        setErrorVisible(false);
    };

    const onOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace") {
            const target = e.currentTarget;
            if (!target.value && idx > 0) {
                otpRefs.current[idx - 1]?.focus();
            }
        }
        if (e.key === "ArrowLeft" && idx > 0) {
            otpRefs.current[idx - 1]?.focus();
        }
        if (e.key === "ArrowRight" && idx < otpRefs.current.length - 1) {
            otpRefs.current[idx + 1]?.focus();
        }
    };

    const onOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = (e.clipboardData || (window as any).clipboardData)?.getData("text") || "";
        const digits = text.replace(/\D/g, "").slice(0, 6).split("");
        if (digits.length) {
            e.preventDefault();
            otpRefs.current.forEach((inp, i) => {
                if (inp) inp.value = digits[i] || "";
            });
            const code = digits.join("");
            setOtpValue(code);
            // focus verify button or the next empty input
            if (code.length >= 6) {
                // do nothing here; verify button becomes enabled
            } else {
                otpRefs.current[digits.length]?.focus();
            }
            setErrorVisible(false);
        }
    };

    const handleResend = () => {
        // demo: just restart timer and clear inputs
        otpRefs.current.forEach((i) => {
            if (i) i.value = "";
        });
        setOtpValue("");
        setErrorVisible(false);
        setLeftSeconds(90);
        setResendEnabled(false);
        setTimeout(() => otpRefs.current[0]?.focus(), 50);
    };

    const handleVerify = async () => {
        const code = otpRefs.current.map((i) => (i?.value || "")).join("");
        setErrorVisible(false);
        const phone = phoneRef.current?.value || "";



        const res = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, otp: code })
        });
        const data = await res.json();
        if (!data.success) {
            setErrorVisible(true);
            otpRefs.current.forEach((i) => { if (i) i.value = ""; });
            setOtpValue("");
            setTimeout(() => otpRefs.current[0]?.focus(), 50);
            return;
        }

        // ذخیره توکن و ریدایرکت
        localStorage.setItem('token', data.token);
        router.push("/dashboard");
    };


    // phone Enter to send
    const onPhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const phone = phoneRef.current?.value || "";
        const agree = !!agreeRef.current?.checked;
        if (e.key === "Enter" && validPhone(phone) && agree) {
            handleSendOtp();
        }
    };
    // otp Enter to verify
    const onOtpContainerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && verifyEnabled) {
            handleVerify();
        }
    };

    // small helper to update send button enabled from phone/agree change
    const updateSendState = () => {
        const phone = phoneRef.current?.value || "";
        const agree = !!agreeRef.current?.checked;
        setCanSend(validPhone(phone) && agree);
    };

    return (
        <>
            <Head>
                <title>ورود / ثبت‌نام با موبایل | دیپاد</title>
                <meta name="description" content="ورود یا ثبت‌نام سریع در دیپاد با شماره موبایل و کد یک‌بارمصرف (OTP)." />
                <meta name="color-scheme" content="light dark" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "ورود/ثبت‌نام با موبایل",
                        "potentialAction": {
                            "@type": "LoginAction",
                            "target": { "@type": "EntryPoint", "urlTemplate": "https://example.com/login-otp" },
                            "result": { "@type": "Person" }
                        }
                    })
                }} />
            </Head>

            <div className="min-h-[100dvh] grid place-items-center px-4" dir="rtl" lang="fa" style={{
                background: "radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,.14), transparent 60%), radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,.15), transparent 60%), #0b0b12",
                color: "#f5f7ff",
                fontFamily: "IRANSans, Vazirmatn, 'Segoe UI', Roboto, sans-serif"
            }}>
                <div className="w-full max-w-[440px] p-5">
                    <div className="rounded-[18px] overflow-hidden" role="dialog" aria-labelledby="title" aria-describedby="desc" style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
                        border: "1px solid rgba(255,255,255,.08)",
                        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
                        borderRadius: "18px"
                    }}>
                        <header className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "rgba(255,255,255,.08)" }}>
                            <div className="w-9 h-9 rounded-[12px]" aria-hidden style={{
                                background: "conic-gradient(from 210deg at 50% 50%, #824dee, #351b67)"
                            }} />
                            <div>
                                <h1 id="title" className="text-base m-0">ورود / ثبت‌نام</h1>
                                <div id="desc" className="text-sm text-[#9aa0b6]">با شماره موبایل و کد یک‌بارمصرف (OTP)</div>
                            </div>
                        </header>

                        {/* Step 1 - phone */}
                        <section id="step-phone" aria-label="phone step" className={`p-4 ${step === "phone" ? "block" : "hidden"}`}>
                            <div className="grid gap-3">
                                <label className="block text-sm">شماره موبایل</label>
                                <input
                                    id="phone"
                                    ref={phoneRef}
                                    inputMode="tel"
                                    dir="ltr"
                                    placeholder="09xxxxxxxxx"
                                    pattern="^0?9\d{9}$"
                                    required
                                    onInput={updateSendState}
                                    onKeyDown={onPhoneKeyDown}
                                    className="w-full bg-[#0f0f1a] border rounded-lg px-3 py-3 text-[#f5f7ff] border-[rgba(255,255,255,0.14)]"
                                />
                                <div id="phoneHelp" className="text-sm text-[#9aa0b6]">با وارد کردن شماره، اگر حساب داشته باشید وارد می‌شوید؛ اگر نداشته باشید، پس از تایید کد برایتان حساب ساخته می‌شود.</div>

                                <label className="flex gap-2 items-start text-sm">
                                    <input ref={agreeRef} id="agree" type="checkbox" onChange={updateSendState} className="mt-1" />
                                    <span>می‌پذیرم که اطلاعات مطابق <a className="text-[#cfd6ff] underline" href="/privacy" target="_blank">حریم خصوصی</a> استفاده شود و با <a className="text-[#cfd6ff] underline" href="/terms" target="_blank">شرایط استفاده</a> موافقم.</span>
                                </label>

                                <button
                                    id="sendOtp"
                                    onClick={handleSendOtp}
                                    disabled={!canSend}
                                    className={`w-full rounded-lg px-4 py-3 text-center ${canSend ? "" : "opacity-60 cursor-not-allowed"}`}
                                    style={{
                                        background: "linear-gradient(135deg,#824dee,#351b67)",
                                        color: "#fff",
                                        border: "1px solid rgba(255,255,255,.08)",
                                        boxShadow: canSend ? "0 8px 24px rgba(130,77,238,.35)" : undefined
                                    }}
                                >
                                    دریافت کد تأیید
                                </button>

                                <div className="bg-[rgba(33,225,184,.1)] border rounded-lg px-3 py-2 text-sm" style={{ borderColor: "rgba(33,225,184,.25)" }}>
                                    نکته امنیتی: کد را با حتی  پشتیبانی به اشتراک نگذارید.
                                </div>
                            </div>
                        </section>

                        {/* Step 2 - OTP */}
                        <section id="step-otp" aria-label="otp step" className={`p-4 ${step === "otp" ? "block" : "hidden"}`}>
                            <div className="grid gap-3" onKeyDown={onOtpContainerKeyDown}>
                                <div className="flex justify-between items-center">
                                    <div>کد ارسال‌شده به <strong id="masked">{maskedPhone}</strong> را وارد کنید.</div>
                                    <button onClick={handleChangePhone} className="rounded-lg px-3 py-2 border" style={{ borderColor: "rgba(255,255,255,0.12)" }}>تغییر شماره</button>
                                </div>

                                <div id="otpBox" dir="ltr" aria-label="کد یک‌بارمصرف" className="grid grid-cols-6 gap-2">
                                    {[0, 1, 2, 3, 4, 5].map((i) => (
                                        <input
                                            key={i}
                                            ref={(el) => {
                                                otpRefs.current[i] = el;
                                            }}
                                            type="tel"
                                            maxLength={1}
                                            inputMode="numeric"
                                            aria-label={`رقم ${i + 1}`}
                                            onChange={(e) => onOtpInput(e, i)}
                                            onKeyDown={(e) => onOtpKeyDown(e, i)}
                                            onPaste={onOtpPaste}
                                            className="aspect-square text-center text-lg bg-[#0f0f1a] border rounded-lg px-2 py-2 text-[#f5f7ff] border-[rgba(255,255,255,0.16)]"
                                        />
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-[#9aa0b6]">زمان باقیمانده: <span className="font-mono">{formatTime(leftSeconds || 0)}</span></div>
                                    <button
                                        id="resend"
                                        onClick={handleResend}
                                        disabled={!resendEnabled}
                                        className={`rounded-lg px-3 py-2 ${resendEnabled ? "" : "opacity-60 cursor-not-allowed"}`}
                                        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                                    >
                                        ارسال مجدد
                                    </button>
                                </div>

                                <div id="error" className={`${errorVisible ? "block" : "hidden"} bg-[rgba(244,67,54,0.12)] border rounded-lg px-3 py-2 text-sm text-[#ffbdb7]`} role="alert" aria-live="assertive" style={{ borderColor: "rgba(244,67,54,0.35)" }}>
                                    کد نادرست است. دوباره تلاش کنید.
                                </div>

                                <button
                                    id="verify"
                                    onClick={handleVerify}
                                    disabled={!verifyEnabled}
                                    className={`w-full rounded-lg px-4 py-3 text-center ${verifyEnabled ? "" : "opacity-60 cursor-not-allowed"}`}
                                    style={{
                                        background: "linear-gradient(135deg,#824dee,#351b67)",
                                        color: "#fff",
                                        border: "1px solid rgba(255,255,255,.08)",
                                        boxShadow: verifyEnabled ? "0 8px 24px rgba(130,77,238,.35)" : undefined
                                    }}
                                >
                                    تایید و ورود
                                </button>
                            </div>
                        </section>

                        <footer className="flex justify-center gap-2 p-4 text-sm text-[#9aa0b6]">
                            <span>کمک لازم داری؟</span>
                            <a href="/contact" target="_blank" className="text-[#cfd6ff] underline">تماس با پشتیبانی</a>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
