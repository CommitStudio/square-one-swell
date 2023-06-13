'use server';

import { toggleWishlist } from '~/_lib/SwellAPI';

export async function toggleWishlistAction(productId: string) {
  return await toggleWishlist(productId);
}
