'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ProductReviews from './ProductReview/ProductReviews';

import WriteAReview from './ProductReview/WriteAReview';

type Inputs = {
  title: string;
  comments: string;
  rating: string;
  reviewId: string;
};

interface Props {
  postReviewAction: (data: {
    userId: string;
    comments: string;
    productId: string;
    rating: number;
    title: string;
  }) => Promise<Review>;
  getReviewsAction: (reviewInfo: {
    productId: string;
    limit?: number;
    page?: number;
  }) => Promise<Reviews>;
  editReviewAction: (
    reviewId: string,
    data: {
      comments: string;
      rating: number;
      title: string;
    }
  ) => Promise<Review>;
  deleteReviewAction: (reviewId: string) => Promise<Review>;
  userId: string | null;
  productId: string;
}

const ReviewSection = ({
  postReviewAction,
  getReviewsAction,
  editReviewAction,
  deleteReviewAction,
  userId,
  productId
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  });

  const [allReviews, setAllReviews] = useState<null | Reviews>(null);
  const [isPostReviewLoading, setIsPostReviewLoading] = useState<boolean>(false);
  const [isDeleteReviewLoading, setIsDeleteReviewLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  // Fetch reviews on mount
  useEffect(() => {
    const getReviews = async () => {
      const reviews = await getReviewsAction({ productId });
      setAllReviews(reviews);
    };
    getReviews().catch((err) => console.log(err));
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!userId) {
      setErrorMessage('You must be logged in to post a review.');
      return;
    }

    setIsPostReviewLoading(true);

    if (isEditing) {
      setIsEditing(false);
      await editReviewAction(data.reviewId, {
        comments: data.comments,
        rating: Number(data.rating),
        title: data.title
      });
    } else {
      //Post new review
      const review = await postReviewAction({
        userId: userId,
        comments: data.comments,
        productId: productId,
        rating: Number(data.rating),
        title: data.title
      });

      // If user already has a review for this product, show error message
      if (!review.comments) {
        setIsPostReviewLoading(false);
        setErrorMessage(
          'You already have a review for this product, just one review per user is allowed.'
        );
        return;
      }
    }
    setValue('title', '');
    setValue('comments', '');
    setValue('rating', '');
    setValue('reviewId', '');
    setRating(0);
    // Fetch reviews after submitting a new review
    const updatedReviews = await getReviewsAction({ productId });
    // Update reviews state
    setAllReviews(updatedReviews);
    setErrorMessage('');
    setIsPostReviewLoading(false);
  };

  const handleDelete = async (reviewId: string) => {
    setIsDeleteReviewLoading(true);
    // Delete review
    await deleteReviewAction(reviewId);
    // Fetch reviews after deleting a review
    const updatedReviews = await getReviewsAction({ productId });
    // Update reviews state
    setAllReviews(updatedReviews);
    setIsDeleteReviewLoading(false);
  };

  return (
    <>
      <div className="my-16">
        <div className="flex space-x-10 -mb-[1px] font-libre">
          <span className="border border-gray-medium py-1 px-3 flex items-center cursor-pointer rounded-tl rounded-tr border-b-white text-lg">
            Reviews ({allReviews?.count})
          </span>
        </div>
        <div className="border border-gray-medium rounded-bl rounded-br rounded-tr mx-auto p-10 space-y-5">
          <ProductReviews
            allReviews={allReviews}
            userId={userId}
            handleDelete={handleDelete}
            setIsEditing={setIsEditing}
            setValue={setValue}
            isDeleteReviewLoading={isDeleteReviewLoading}
            setRating={setRating}
          />
          <WriteAReview
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isPostReviewLoading={isPostReviewLoading}
            isEditing={isEditing}
            setValue={setValue}
            rating={rating}
            setRating={setRating}
          />
          <p className="text-red-600">{errorMessage}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
