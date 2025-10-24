import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const SECRET = 'supersecretkey';

export async function POST(req: Request) {
  const { username, otp } = await req.json();
  const dbPath = path.join(process.cwd(), 'db/users.json');
  const users = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  const user = users.find((u:any) => u.username === username);
  if (!user) return new Response(JSON.stringify({ error: 'کاربر یافت نشد' }), { status: 404 });

  if (user.otp !== otp || Date.now() > user.otpExpires) {
    return new Response(JSON.stringify({ error: 'OTP نامعتبر یا منقضی شده' }), { status: 401 });
  }

  // OTP مصرف شد
  user.otp = null;
  user.otpExpires = null;
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

  // ساخت توکن JWT
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '1h' });

  return new Response(JSON.stringify({ token }));
}
