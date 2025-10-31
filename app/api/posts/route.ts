import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  createdAt: string;
  status?: 'draft' | 'published';
}

const filePath = path.join(process.cwd(), 'data', 'posts.json');

function readPosts(): Post[] {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')).posts || [];
}
function writePosts(posts: Post[]) {
  fs.writeFileSync(filePath, JSON.stringify({ posts }, null, 2));
}

export async function GET() {
  return NextResponse.json(readPosts());
}

export async function POST(req: NextRequest) {
  const newPost: Post = await req.json();
  const posts = readPosts();

  newPost.id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  newPost.createdAt = new Date().toISOString();

  posts.push(newPost);
  writePosts(posts);
  return NextResponse.json(newPost);
}

export async function PUT(req: NextRequest) {
  const updatePost: Post = await req.json();
  const posts = readPosts();
  const index = posts.findIndex((p: Post) => p.id === updatePost.id);
  if (index === -1)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  posts[index] = { ...posts[index], ...updatePost };
  writePosts(posts);
  return NextResponse.json(posts[index]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const posts = readPosts().filter((p: Post) => p.id !== id);
  writePosts(posts);
  return NextResponse.json({ message: 'Deleted' });
}
