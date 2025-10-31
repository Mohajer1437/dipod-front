import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

function readDb() {
  if (!fs.existsSync(DB_PATH)) return { users: [] };
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();
    const db = readDb();

    const user = db.users.find(
      (u: any) => String(u.phone).trim() === String(phone).trim() && String(u.otp).trim() === String(otp).trim()
    );

    if (!user) {
      return NextResponse.json({ success: false, error: "کد تایید نادرست است." }, { status: 400 });
    }

    // پاک کردن OTP بعد از تایید
    user.otp = null;
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");

    // ساخت JWT
    const token = jwt.sign(
      { userId: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ساخت پاسخ و ست کردن کوکی HttpOnly
    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 روز
    });

    console.log(`[verify-otp] ✅ token created for ${user.phone} (${user.role})`);

    return res;
  } catch (err) {
    console.error("[verify-otp] Server error:", err);
    return NextResponse.json({ success: false, error: "خطا در سرور." }, { status: 500 });
  }
}
