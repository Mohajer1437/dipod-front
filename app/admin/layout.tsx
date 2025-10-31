import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import AdminLayoutClient from "./_layout-client";

interface TokenPayload {
  userId: number;
  phone: string;
  role: string;
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("[AdminLayout] ❌ Token not found — redirecting to /login");
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    if (decoded.role !== "admin") {
      console.warn("[AdminLayout] ⚠️ Non-admin role detected:", decoded.role);
      redirect("/");
    }
  } catch (err) {
    console.error("[AdminLayout] ❌ Token verification failed:", err);
    redirect("/login");
  }

  // ✅ render client layout
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
