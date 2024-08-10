import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = [
    "/",
    "/login",
    "/signup",
    "/product/[productId]",
    "/subscription",
    "/support",
  ];
  const isPublicPath = publicPaths.some((pp) =>
    pp.includes("[")
      ? new RegExp("^" + pp.replace("[", "").replace("]", "") + "$").test(path)
      : pp === path
  );
  const token = request.cookies.get("loginToken")?.value;

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
