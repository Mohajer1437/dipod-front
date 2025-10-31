import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // 👈 کتابخانه‌ی امن و سازگار با Edge

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // فقط مسیرهای admin بررسی بشن
  if (path.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.warn("[middleware] ❌ No token — redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const { payload }: any = await jwtVerify(token, secret);
      console.log("[middleware] ✅ Token payload:", payload);

      if (payload.role !== "admin") {
        console.warn("[middleware] ⚠️ Non-admin role:", payload.role);
        return NextResponse.redirect(new URL("/", req.url));
      }

      // اجازه بده ادامه بده
      return NextResponse.next();
    } catch (err) {
      console.error("[middleware] ❌ Token invalid or expired:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
