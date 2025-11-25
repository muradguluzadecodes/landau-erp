import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

// --- MATCHERS (placed INSIDE this file for Next.js 15+) ---
export const config = {
  matcher: [
    // Match everything except Next.js internals & static assets
    '/((?!_next|static|favicon.ico|assets|images|api|.*\\..*$).*)',
  ],
};
// ------------------------------------------------------------

export function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value ?? null;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith('/auth');

  // If no token → protect all pages except /auth
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If token exists → prevent visiting /auth
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/users', req.url));
  }

  return NextResponse.next();
}
