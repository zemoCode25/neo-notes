import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./app/auth/jwt";

const protectedRoutes = ["/dashboard", "/about", "/settings"];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  if (protectedRoutes.includes(pathName)) {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    const payload = await verifyJwt(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
