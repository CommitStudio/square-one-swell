'use server';

import Store from '~/_lib/Store';

export async function getReviewsAction(productId: string) {
  return (await Store.getReviews(productId)) as Reviews;
}

export async function postReviewAction(reviewInfo: {
  userId: string;
  comments: string;
  productId: string;
  rating: number;
  title: string;
}) {
  return (await Store.postReview(reviewInfo)) as Review;
}

export async function deleteReviewAction(reviewId: string) {
  return (await Store.deleteReview(reviewId)) as Review;
}

export async function editReviewAction(
  reviewId: string,
  reviewInfo: {
    comments: string;
    rating: number;
    title: string;
  }
) {
  return (await Store.editReview(reviewId, reviewInfo)) as Review;
}
