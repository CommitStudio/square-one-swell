import { NextResponse } from 'next/server';

import { getWishlist } from '~/_lib/SwellAPI';

export async function GET() {
  const wishlist = await getWishlist();
  return NextResponse.json({ wishlist });
}
