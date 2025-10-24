import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function readDb() {
    if (!fs.existsSync(DB_PATH)) return { users: [] };
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

export async function POST(req: NextRequest) {
    try {
        const { phone, otp } = await req.json();
        const db = readDb();

        const user = db.users.find((u: any) => u.phone === phone && u.otp === otp);
        if (!user) {
            return NextResponse.json({ success: false, error: 'کد نادرست است.' }, { status: 400 });
        }

        // OTP را پاک کنید یا expire کنید
        user.otp = null;
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');

        // در ادامه می‌توانید JWT بسازید و برگردانید
        const token = 'dummy-token-for-demo'; // TODO: generate real JWT

        return NextResponse.json({ success: true, token });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: 'خطا در سرور' }, { status: 500 });
    }
}
