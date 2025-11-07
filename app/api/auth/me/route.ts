import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: decoded.userId,
        phone: decoded.phone,
        role: decoded.role,
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
