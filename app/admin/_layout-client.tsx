'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const menu = [
    { label: "داشبورد", icon: "🏠", href: "/admin" },
    { label: "مدیریت پست‌ها", icon: "📰", href: "/admin/posts" },
    { label: "مدیریت کاربران", icon: "👥", href: "/admin/users" },
    { label: "درخواست‌های محصول", icon: "📦", href: "/admin/requests" },
  ];

  return (
    <div
      dir="rtl"
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 90% -10%, rgba(130,77,238,.14), transparent 60%)," +
          "radial-gradient(900px 600px at -10% 10%, rgba(53,27,103,.15), transparent 60%)," +
          "#0b0b12",
        color: "#f5f7ff",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))",
          borderInlineStart: "1px solid rgba(255,255,255,.04)",
          borderInlineEnd: "1px solid rgba(255,255,255,.08)",
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "16px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              background: "conic-gradient(from 210deg, #824dee, #351b67)",
              boxShadow: "0 6px 18px rgba(130,77,238,.45)",
            }}
          />
          <strong>دیپاد</strong>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {menu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".6rem",
                  padding: ".6rem .8rem",
                  borderRadius: "12px",
                  color: "#e6e9ff",
                  background: active ? "rgba(130,77,238,.14)" : "transparent",
                  outline: active ? "1px solid rgba(130,77,238,.35)" : "none",
                  transition: ".2s",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", fontSize: ".8rem", color: "#9aa0b6" }}>
          © 2025 Dipad Admin
        </div>
      </aside>

      {/* Main */}
      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
}
