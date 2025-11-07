import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "requests.json");

// تابع خواندن فایل
function readRequests() {
  if (!fs.existsSync(FILE_PATH)) return { requests: [] };
  return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

// تابع نوشتن فایل
function writeRequests(data: any) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function POST(req: NextRequest) {
  try {
    const { name, family, phone, email } = await req.json();
    if (!name || !family || !phone || !email)
      return NextResponse.json({ success: false, error: "اطلاعات ناقص است." }, { status: 400 });

    const db = readRequests();

    // بررسی تکراری بودن شماره
    const exists = db.requests.find((r: any) => String(r.phone).trim() === String(phone).trim());
    if (exists) {
      return NextResponse.json({ success: false, duplicate: true, error: "شما قبلاً درخواست خود را ثبت کرده‌اید." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "ایمیل معتبر نیست." }, { status: 400 });
    }


    const newRequest = {
      id: Date.now(),
      name,
      family,
      phone,
      email,
      date: new Date().toISOString(),
      status: "pending",
    };

    db.requests.push(newRequest);
    writeRequests(db);

    console.log("✅ درخواست جدید ثبت شد:", newRequest);

    return NextResponse.json({ success: true, request: newRequest });
  } catch (err) {
    console.error("[request API error]", err);
    return NextResponse.json({ success: false, error: "خطای سرور" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = readRequests();
    return NextResponse.json(db.requests);
  } catch (err) {
    return NextResponse.json({ success: false, error: "خطای خواندن داده‌ها" }, { status: 500 });
  }
}
