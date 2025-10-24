// app/login/layout.tsx
export const metadata = {
  title: "ورود / ثبت‌نام با موبایل | دیپاد",
  description: "ورود یا ثبت‌نام سریع در دیپاد با شماره موبایل و کد یک‌بارمصرف (OTP).",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          background:
            "radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,.14), transparent 60%)," +
            "radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,.15), transparent 60%)," +
            "#0b0b12",
          color: "#f5f7ff",
          fontFamily: "IRANSans, Vazirmatn, 'Segoe UI', Roboto, sans-serif",
          minHeight: "100dvh",
        }}
      >
        {children}
      </body>
    </html>
  );
}