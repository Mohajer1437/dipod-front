import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'submissions.json');

type Submission = {
  id: string;
  name: string;
  email?: string;
  message: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
};

// پاکسازی ورودی‌ها از کاراکترهای خطرناک
function sanitize(input: string) {
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim();
}

// اطمینان از وجود پوشه data
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// خواندن فایل JSON
async function readSubmissions(): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

// نوشتن امن (اتمیک)
async function writeSubmissions(list: Submission[]) {
  const tmp = FILE + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), 'utf-8');
  await fs.rename(tmp, FILE);
}

export async function POST(req: Request) {
  const secretHeader = req.headers.get('x-form-secret') || '';
  const serverSecret = process.env.FORM_SECRET || process.env.NEXT_PUBLIC_FORM_SECRET || '';

  if (!serverSecret || secretHeader !== serverSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const ua = req.headers.get('user-agent') || '';

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = sanitize(String(body.name || ''));
  const email = sanitize(String(body.email || ''));
  const message = sanitize(String(body.message || ''));

  if (!name || !message)
    return NextResponse.json({ error: 'نام و پیام الزامی است' }, { status: 400 });

  await ensureDataDir();
  const list = await readSubmissions();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const item: Submission = {
    id,
    name,
    email: email || undefined,
    message,
    ip,
    userAgent: ua,
    createdAt: new Date().toISOString(),
  };
  list.push(item);
  await writeSubmissions(list);

  return NextResponse.json({ ok: true, id });
}
