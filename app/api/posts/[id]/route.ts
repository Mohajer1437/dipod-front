import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'db.json');

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const updatePost = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const id = parseInt(params.id);
  const index = data.posts.findIndex((p: any) => p.id === id);

  if (index === -1) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  data.posts[index] = { ...data.posts[index], ...updatePost };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(data.posts[index]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const id = parseInt(params.id);
  data.posts = data.posts.filter((p: any) => p.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: 'Deleted' });
}
