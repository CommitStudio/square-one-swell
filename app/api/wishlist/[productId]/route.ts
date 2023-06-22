import { NextResponse } from 'next/server';

import { isProductInWishlist, toggleWishlist } from '~/_lib/SwellAPI';

export async function GET(request: Request, { params }: { params: { productId: string } }) {
  const productId = params.productId;
  const inWishlist = await isProductInWishlist(productId);
  return NextResponse.json({ status: inWishlist });
}

export async function PUT(request: Request, { params }: { params: { productId: string } }) {
  const productId = params.productId;
  const wishlist = await toggleWishlist(productId);
  return NextResponse.json({ wishlist });
}
