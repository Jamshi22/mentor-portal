import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('authToken'); // Assuming token is stored in cookies
  const url = request.nextUrl.clone();

  // Redirect to login if there is no token and user tries to access the dashboard
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to dashboard if user is already logged in and tries to access the login page
  if (token && url.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/'],
};
