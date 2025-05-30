import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const cookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  if (!cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }
};

export default middleware;

// This middleware checks if the user is authenticated by looking for a session cookie.
// If the cookie is not present, it redirects the user to the home page.
export const config = {
  matcher: ["/", "/dashboard/:path*", "/chats/:path*"],
};
