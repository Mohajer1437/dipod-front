import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

// مسیر فایل users.json
const USERS_FILE = path.join(process.cwd(), "data", "users.json");

// خواندن فایل
function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed && Array.isArray(parsed.users) ? parsed : { users: [] };
  } catch {
    return { users: [] };
  }
}

// نوشتن فایل
function writeUsers(data: any) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, error: "شماره یا کد تأیید وارد نشده است." },
        { status: 400 }
      );
    }

    const db = readUsers();
    const now = Date.now();

    // پیدا کردن کاربر
    const user = db.users.find((u: any) => u.phone === phone);

    if (!user || !user.otp) {
      return NextResponse.json(
        { success: false, error: "کاربری با این شماره یافت نشد یا کد منقضی است." },
        { status: 404 }
      );
    }

    // بررسی انقضا
    if (user.otpExpiresAt && now > user.otpExpiresAt) {
      // حذف OTP منقضی‌شده
      user.otp = null;
      user.otpExpiresAt = null;
      writeUsers(db);
      return NextResponse.json(
        { success: false, error: "کد تأیید منقضی شده است. دوباره تلاش کنید." },
        { status: 410 }
      );
    }

    // بررسی تطابق OTP
    if (String(user.otp).trim() !== String(otp).trim()) {
      return NextResponse.json(
        { success: false, error: "کد تأیید نادرست است." },
        { status: 400 }
      );
    }

    // حذف OTP بعد از تأیید موفق
    user.otp = null;
    user.otpExpiresAt = null;
    writeUsers(db);

    // ساخت JWT ایمن
    const token = jwt.sign(
      {
        userId: user.id,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" } // 7 روز
    );

    // تنظیم کوکی HttpOnly امن
    const res = NextResponse.json({ success: true, message: "ورود با موفقیت انجام شد." });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 روز
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`[verify-otp] ✅ ورود موفق برای ${user.phone} (${user.role})`);
    }

    return res;
  } catch (err) {
    console.error("[verify-otp] Server error:", err);
    return NextResponse.json(
      { success: false, error: "خطای داخلی سرور." },
      { status: 500 }
    );
  }
}
