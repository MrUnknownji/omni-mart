import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/",
  "/products/[productId]",
  "/subscription",
  "/support",
];
const authRoutes = ["/login", "/signup"];
const protectedRoutes = [
  "/profile",
  "/cart",
  "/checkout",
  "/wishlist",
  "/orders",
  "/orders/[orderId]",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("loginToken")?.value;

  console.log(`Middleware triggered for path: ${path}`);
  console.log(`Token exists: ${!!token}`);

  if (authRoutes.includes(path)) {
    console.log("Auth route detected");
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (protectedRoutes.some((route) => path.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (publicRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
