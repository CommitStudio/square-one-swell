'use server';

import { toggleWishlist, getWishlistIds } from '~/_lib/SwellAPI';

export async function toggleWishlistAction(productId: string) {
  return await toggleWishlist(productId);
}

export async function getWishlistIdsAction() {
  return await getWishlistIds();
}
