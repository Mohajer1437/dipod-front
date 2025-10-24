import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { username } = await req.json();
  const dbPath = path.join(process.cwd(), 'db/users.json');
  const users = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  const user = users.find((u:any) => u.username === username);
  if (!user) return new Response(JSON.stringify({ error: 'کاربر یافت نشد' }), { status: 404 });

  // تولید OTP 6 رقمی
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 5 * 60 * 1000; // 5 دقیقه اعتبار

  user.otp = otp;
  user.otpExpires = otpExpires;

  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

  console.log(`OTP برای ${username}: ${otp}`); // در حالت واقعی با SMS/ایمیل ارسال شود

  return new Response(JSON.stringify({ message: 'OTP ارسال شد' }));
}
