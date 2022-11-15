import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { getLoggedUser } from '~/lib/SwellGraphQL';

export const config = {
  matcher: ['/account/:path*']
};

const allowedRoutes = ['/account/login', '/account/create-account'];

export async function middleware(request: NextRequest) {
  const { data } = await getLoggedUser(request);

  if (allowedRoutes.includes(request.nextUrl.pathname) && data.session.accountId) {
    return NextResponse.redirect(new URL('/account/orders', request.url));
  }

  if (!data.session.accountId && !allowedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/account/login', request.url));
  }
}
