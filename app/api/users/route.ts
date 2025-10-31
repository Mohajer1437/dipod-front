import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface User {
  id: number;
  username: string;
  password?: string;
  role: 'admin' | 'customer';
}

const filePath = path.join(process.cwd(), 'data', 'users.json');

function readUsers(): User[] {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')).users || [];
}
function writeUsers(users: User[]) {
  fs.writeFileSync(filePath, JSON.stringify({ users }, null, 2));
}

export async function GET() {
  return NextResponse.json(readUsers());
}

export async function POST(req: NextRequest) {
  const newUser: User = await req.json();
  const users = readUsers();

  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  writeUsers(users);
  return NextResponse.json(newUser);
}

export async function PUT(req: NextRequest) {
  const updateUser: User = await req.json();
  const users = readUsers();
  const index = users.findIndex((u: User) => u.id === updateUser.id);
  if (index === -1)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  users[index] = { ...users[index], ...updateUser };
  writeUsers(users);
  return NextResponse.json(users[index]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const users = readUsers().filter((u: User) => u.id !== id);
  writeUsers(users);
  return NextResponse.json({ message: 'Deleted' });
}
