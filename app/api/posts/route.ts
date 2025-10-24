import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'db.json');

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return NextResponse.json(data.posts);
}

export async function POST(req: NextRequest) {
  const newPost = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  newPost.id = data.posts.length ? data.posts[data.posts.length - 1].id + 1 : 1;
  newPost.createdAt = new Date().toISOString();

  data.posts.push(newPost);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(newPost);
}

export async function PUT(req: NextRequest) {
  const updatePost = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const index = data.posts.findIndex((p: any) => p.id === updatePost.id);
  if (index === -1) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  data.posts[index] = { ...data.posts[index], ...updatePost };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(data.posts[index]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data.posts = data.posts.filter((p: any) => p.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: 'Deleted' });
}
