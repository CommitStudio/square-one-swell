'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Spinner } from '~/_components/Globals/Spinner';

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
  getReviewsAction: (productId: string) => Promise<Reviews>;
  deleteReviewAction: (reviewId: string) => Promise<Review>;
  editReviewAction: (
    reviewId: string,
    data: {
      comments: string;
      rating: number;
      title: string;
    }
  ) => Promise<Review>;
  userId: string | null;
  productId: string;
}

const Reviews = ({
  postReviewAction,
  getReviewsAction,
  deleteReviewAction,
  editReviewAction,
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

  // Fetch reviews on mount
  useEffect(() => {
    const getReviews = async () => {
      const Reviews = await getReviewsAction(productId);
      setAllReviews(Reviews);
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
      setValue('title', '');
      setValue('comments', '');
      setValue('rating', '');
      setValue('reviewId', '');
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
    // Fetch reviews after submitting a new review
    const updatedReviews = await getReviewsAction(productId);
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
    const updatedReviews = await getReviewsAction(productId);
    // Update reviews state
    setAllReviews(updatedReviews);
    setIsDeleteReviewLoading(false);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
        className=""
      >
        <input
          id="reviewTitle"
          type="text"
          className="scroll-mt-32 block w-full border focus:outline-0 md:w-[350px] border-black rounded-lg p-2 pl-4 mb-3"
          placeholder="Title..."
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="text-red-600 text-xs">{errors.title.message}</p>}

        <input
          type="text"
          className="block w-full border focus:outline-0 md:w-[350px] border-black rounded-lg p-2 pl-4 mb-3"
          placeholder="Comments..."
          {...register('comments', { required: 'Comments are required' })}
        />
        {errors.comments && <p className="text-red-600 text-xs">{errors.comments.message}</p>}

        <input
          type="number"
          className="block w-full border focus:outline-0 md:w-[350px] border-black rounded-lg p-2 pl-4 mb-3"
          placeholder="Rating..."
          {...register('rating', { required: 'Rating is required' })}
        />
        {errors.rating && <p className="text-red-600 text-xs">{errors.rating.message}</p>}

        <button
          disabled={isPostReviewLoading}
          className={`font-bold py-3 px-5 md:min-w-[240px]
         ${
           isEditing
             ? 'bg-[#eab308]'
             : !isPostReviewLoading
             ? 'bg-black font-quicksand border text-white duration-200 cursor-pointer hover:bg-white hover:text-black'
             : 'bg-gray-medium text-white font-quicksand border border-gray-medium'
         }`}
        >
          {isPostReviewLoading ? <Spinner size={6} /> : isEditing ? 'Edit review' : 'Submit review'}
        </button>
      </form>
      <p className="text-red-600">{errorMessage}</p>

      {allReviews?.results.map((review) => (
        <div key={review.id} className="flex flex-col items-start mt-4 border p-4">
          <div>
            <span className="font-bold">Name: </span>{' '}
            {review.name && <span className="">{review.name}</span>}
          </div>
          <div>
            <span className="font-bold">Date: </span>
            <span className="text-sm">
              {new Date(review.date_created).toISOString().split('T')[0]}
            </span>
          </div>
          <div>
            <span className="font-bold">Title: </span>
            <span className="">{review.title}</span>
          </div>
          <div>
            <span className="font-bold">Rating: </span>
            <span className="text-sm">{review.rating}</span>
          </div>
          <div>
            <span className="font-bold">Review: </span>
            <span className="text-sm">{review.comments}</span>
          </div>

          {userId === review.account_id && (
            <button
              onClick={() => {
                setIsEditing(true);
                setValue('title', review.title);
                setValue('comments', review.comments);
                setValue('rating', review.rating.toString());
                setValue('reviewId', review.id);
                const reviewTitleElement = document?.getElementById('reviewTitle');
                if (reviewTitleElement) {
                  reviewTitleElement.scrollIntoView();
                }
              }}
              className="font-bold md:min-w-[240px] self-end py-1 bg-[#eab308] font-quicksand border text-white duration-200 cursor-pointer"
            >
              Edit review
            </button>
          )}

          {userId === review.account_id && (
            <button
              onClick={() => {
                handleDelete(review.id).catch((err) => console.log(err));
              }}
              disabled={isDeleteReviewLoading}
              className={`font-bold md:min-w-[240px] self-end py-1
         ${
           !isDeleteReviewLoading
             ? 'bg-red-500 font-quicksand border text-white duration-200 cursor-pointer'
             : 'bg-gray-medium text-white font-quicksand border border-gray-medium'
         }`}
            >
              {isDeleteReviewLoading ? <Spinner size={6} /> : 'Delete review'}
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default Reviews;
