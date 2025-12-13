import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/varon"];
const AUTH_ROUTES = ["/login", "/register"];

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/users/get`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token_id_user")?.value || null;
  const { pathname } = req.nextUrl;

  if (!token && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const isValid = await validateToken(token);

    if (!isValid) {
      if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token");
        return response;
      }

      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/varon", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/varon/:path*", "/login", "/register"],
};
