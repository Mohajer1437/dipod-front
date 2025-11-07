import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// مسیر فایل users.json
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// توابع کمکی
function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed && Array.isArray(parsed.users) ? parsed : { users: [] };
  } catch {
    return { users: [] };
  }
}

function writeUsers(data: any) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// تولید OTP امن‌تر (۶ رقم)
function generateOtp() {
  return ('' + crypto.randomInt(100000, 999999));
}

// حذف کاراکترهای ناخواسته از ورودی
function sanitizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, '').trim();
}

// محدودیت زمانی ارسال دوباره (بر ثانیه)
const RESEND_COOLDOWN = 60; // ۶۰ ثانیه

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let phone = body.phone;
    if (!phone) {
      return NextResponse.json({ error: 'شماره موبایل الزامی است' }, { status: 400 });
    }

    phone = sanitizePhone(phone);
    if (!/^(\+98|0)?9\d{9}$/.test(phone)) {
      return NextResponse.json({ error: 'شماره موبایل معتبر نیست' }, { status: 400 });
    }

    const otp = generateOtp();
    const now = Date.now();

    const db = readUsers();
    let user = db.users.find((u: any) => u.phone === phone);

    // بررسی محدودیت ارسال مجدد
    if (user && user.lastOtpAt && now - user.lastOtpAt < RESEND_COOLDOWN * 1000) {
      const waitSec = Math.ceil((RESEND_COOLDOWN * 1000 - (now - user.lastOtpAt)) / 1000);
      return NextResponse.json(
        { error: `لطفاً ${waitSec} ثانیه دیگر مجدداً تلاش کنید.` },
        { status: 429 } // Too Many Requests
      );
    }

    // تنظیم اطلاعات کاربر
    if (!user) {
      user = { id: Date.now(), phone, role: 'customer' };
      db.users.push(user);
    }

    user.otp = otp;
    user.otpExpiresAt = now + 2 * 60 * 1000; // انقضا ۲ دقیقه
    user.lastOtpAt = now;

    writeUsers(db);

    // در حالت واقعی: ارسال SMS از طریق سرویس
    // await SMS.send_otp(phone, otp);

    // در محیط توسعه می‌فرستیم فقط برای تست
    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ OTP [${phone}]: ${otp}`);
    }

    return NextResponse.json({ success: true, message: 'کد تأیید ارسال شد' });
  } catch (err: any) {
    console.error('OTP Error:', err);
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}
