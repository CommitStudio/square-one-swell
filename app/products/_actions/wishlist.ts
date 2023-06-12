'use server';

import { toggleWishlist, getWishlistIds, getWishlist } from '~/_lib/SwellAPI';

export async function toggleWishlistAction(productId: string) {
  return await toggleWishlist(productId);
}

export async function getWishlistIdsAction() {
  return await getWishlistIds();
}

export async function getWishlistAction() {
  return await getWishlist();
}
