/* eslint-disable sort-exports/sort-exports */
import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const verify = request.cookies.has('authorized');
    if (!verify && pathname.includes('/dashboard')) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(new URL(url, request.url));
    }
    if (verify && pathname.includes('/auth/login')) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(new URL(url, request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*', '/', '/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
