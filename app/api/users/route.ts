import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const filePath = path.join(process.cwd(), 'data', 'db.json');

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return NextResponse.json(data.users);
}

export async function POST(req: NextRequest) {
  const newUser = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  newUser.id = data.users.length ? data.users[data.users.length - 1].id + 1 : 1;
  newUser.password = await bcrypt.hash(newUser.password, 10);

  data.users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(newUser);
}

export async function PUT(req: NextRequest) {
  const updateUser = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const index = data.users.findIndex((u: any) => u.id === updateUser.id);
  if (index === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  if (updateUser.password) {
    updateUser.password = await bcrypt.hash(updateUser.password, 10);
  } else {
    updateUser.password = data.users[index].password;
  }

  data.users[index] = { ...data.users[index], ...updateUser };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(data.users[index]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data.users = data.users.filter((u: any) => u.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: 'Deleted' });
}
