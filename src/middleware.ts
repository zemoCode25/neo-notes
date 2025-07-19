import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./app/auth/jwt";

const protectedRoutes = ["/dashboard", "/about", "/settings"];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  console.log("Request path:", pathName);
  if (protectedRoutes.includes(pathName)) {
    const token = request.cookies.get("token")?.value || "";

    console.log("Token from cookies:", token);

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyJwt(token);

    console.log("JWT payload:", payload);

    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
