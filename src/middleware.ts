import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { getLoggedUser } from '~/lib/SwellGraphQL';

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/account/login' ||
    request.nextUrl.pathname === '/account/register'
  ) {
    return;
  }

  const { data } = await getLoggedUser(request);

  if (!data.session.accountId) {
    return NextResponse.redirect(new URL('/account/login', request.url));
  }
}

export const config = {
  matcher: ['/account/:path*']
};
