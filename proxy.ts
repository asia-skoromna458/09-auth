import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.includes(pathname);

 
  if (isPrivate && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  
  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};



