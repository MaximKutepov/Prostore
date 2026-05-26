import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      const { pathname } = request.nextUrl;
      const isGuest = !auth;
      const isAdmin = auth?.user?.role === "admin";

      // 1. ADMIN PATH PROTECTION
      if (pathname.startsWith("/admin")) {
        if (isGuest) return false; // Redirects guest to login
        if (!isAdmin) {
          // Already logged in but NOT an admin? Redirect to home instead of login page
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
      ];

      // Check if user is not authenticated and accessing a protected path
      if (isGuest && protectedPaths.some((p) => p.test(pathname))) return false;

      // Check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        //Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        //Clone the req headers
        const newRequestHeaders = new Headers(request.headers);

        //Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        //Set newly generated sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
