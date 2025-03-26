import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/guide",
    "/about",
    "/contact",
    "/legal",

  ];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token.status !== "APPROVED" && pathname !== "/approval") {
    return NextResponse.redirect(new URL("/approval", req.url));
  }

  if (pathname.startsWith("/admin")) {
    if (token.role === "admin" || token.role === "manager") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (
    token.role === "admin" ||
    (token.role === "manager" && !pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
