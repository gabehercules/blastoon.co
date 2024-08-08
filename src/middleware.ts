import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // todo: check if a cookie or session exists in local storage, if not, redirect to login page or homepage
  //
  // uncomment the following line to redirect to the homepage after add the authentication logic
  //   return NextResponse.redirect(new URL("/", request.url));
}

// update the matchers to include the paths that should require authentication
// actually only the dashboard path should require authentication
//
export const config = {
  matcher: "/dashboard/:path*",
};
