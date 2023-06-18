import { NextResponse } from 'next/server';

import { getWishlistIds } from '~/_lib/SwellAPI';

export async function GET() {
  const wishlist = await getWishlistIds();
  return NextResponse.json({ wishlist });
}
