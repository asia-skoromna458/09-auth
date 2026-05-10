import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/clientApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.includes(pathname);

  // -----------------------------
  // PRIVATE ROUTES
  // -----------------------------
  if (isPrivate) {
    // Немає accessToken → пробуємо оновити сесію
    if (!accessToken) {
      // Якщо немає refreshToken → редірект
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // Є refreshToken → пробуємо оновити сесію
      try {
        const session = await checkSession();

        const response = NextResponse.next();

        if (session.accessToken) {
          response.cookies.set("accessToken", session.accessToken, {
            httpOnly: true,
            path: "/",
          });
        }

        if (session.refreshToken) {
          response.cookies.set("refreshToken", session.refreshToken, {
            httpOnly: true,
            path: "/",
          });
        }

        return response;
      } catch {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  // -----------------------------
  // PUBLIC ROUTES
  // -----------------------------
  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
