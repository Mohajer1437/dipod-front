import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// مسیر دقیق db.json
const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function readDb() {
    if (!fs.existsSync(DB_PATH)) return { users: [] };
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDb(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const phone: string = body.phone;

        if (!/^0?9\d{9}$/.test(phone)) {
            return NextResponse.json({ error: 'شماره موبایل نامعتبر است.' }, { status: 400 });
        }

        // OTP 6 رقمی تصادفی
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // خواندن دیتابیس
        const db = readDb();
        let user = db.users.find((u: any) => u.phone === phone);

        if (!user) {
            user = { id: Date.now(), phone, otp, role: 'customer' };
            db.users.push(user);
        } else {
            user.otp = otp;
        }

        writeDb(db);

        console.log(`OTP for ${phone}: ${otp}`);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'خطا در سرور' }, { status: 500 });
    }
}
