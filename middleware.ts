import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/home', '/collection', '/wallet', '/profile'];
const authPaths = ['/login', '/verify'];

export function middleware(req: NextRequest) {
  const session = req.cookies.get('ec_session')?.value;
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  if (isProtected && session !== 'authenticated') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAuthPage && session === 'authenticated') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/collection/:path*', '/wallet/:path*', '/profile/:path*', '/login', '/verify'],
};