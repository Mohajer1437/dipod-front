import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface RequestItem {
  id: number;
  type: string;
  priority: string;
  status: string;
  createdAt: string;
  title?: string;
  desc?: string;
}

const filePath = path.join(process.cwd(), 'data', 'requests.json');

function readRequests(): RequestItem[] {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')).requests || [];
}
function writeRequests(requests: RequestItem[]) {
  fs.writeFileSync(filePath, JSON.stringify({ requests }, null, 2));
}

export async function GET() {
  return NextResponse.json(readRequests());
}

export async function POST(req: NextRequest) {
  const newReq: RequestItem = await req.json();
  const requests = readRequests();

  newReq.id = requests.length ? requests[requests.length - 1].id + 1 : 1;
  newReq.createdAt = new Date().toISOString();

  requests.push(newReq);
  writeRequests(requests);
  return NextResponse.json(newReq);
}

export async function PUT(req: NextRequest) {
  const updateReq: RequestItem = await req.json();
  const requests = readRequests();
  const index = requests.findIndex((r: RequestItem) => r.id === updateReq.id);
  if (index === -1)
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });

  requests[index] = { ...requests[index], ...updateReq };
  writeRequests(requests);
  return NextResponse.json(requests[index]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const requests = readRequests().filter((r: RequestItem) => r.id !== id);
  writeRequests(requests);
  return NextResponse.json({ message: 'Deleted' });
}
