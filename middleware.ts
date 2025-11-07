import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // فقط مسیرهای admin بررسی بشن
  if (path.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const { payload }: any = await jwtVerify(token, secret);

      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // اجازه بده ادامه بده
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
