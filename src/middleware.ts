import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { getLoggedUser } from '~/lib/SwellGraphQL';

export async function middleware(request: NextRequest) {
  const { data } = await getLoggedUser(request);

  if (
    request.nextUrl.pathname === '/account/login' ||
    request.nextUrl.pathname === '/account/register'
  ) {
    return NextResponse.redirect(new URL('/account/orders', request.url));
  }

  if (!data.session.accountId) {
    return NextResponse.redirect(new URL('/account/login', request.url));
  }
}

export const config = {
  matcher: ['/account/:path*']
};
