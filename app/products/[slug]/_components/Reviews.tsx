'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Spinner } from '~/_components/Globals/Spinner';

type Inputs = {
  title: string;
  comments: string;
  rating: string;
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
  userId: string;
  productId: string;
}

const Reviews = ({ postReviewAction, getReviewsAction, userId, productId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  });

  const [allReviews, setAllReviews] = useState<null | Reviews>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
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
      setIsLoading(false);
      setErrorMessage(
        'You already have a review for this product, just one review per user is allowed.'
      );
      return;
    }
    // Fetch reviews after submitting a new review
    const updatedReviews = await getReviewsAction(productId);
    // Update reviews state
    setAllReviews(updatedReviews);
    setErrorMessage('');
    setIsLoading(false);
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
          type="text"
          className="block w-full border focus:outline-0 md:w-[350px] border-black rounded-lg p-2 pl-4 mb-3"
          placeholder="Title..."
          {...register('title', { required: true })}
        />

        <input
          type="text"
          className="block w-full border focus:outline-0 md:w-[350px] border-black rounded-lg p-2 pl-4 mb-3"
          placeholder="Comments..."
          {...register('comments', { required: true })}
        />

        <input
          type="number"
          className="block w-full border focus:outline-0 md:w-[350px] border-black rounded-lg p-2 pl-4 mb-3"
          placeholder="Rating..."
          {...register('rating', { required: true })}
        />

        <button
          disabled={isLoading}
          className={`font-bold py-3 px-5 md:min-w-[240px]
         ${
           !isLoading
             ? 'bg-black font-quicksand border text-white duration-200 cursor-pointer hover:bg-white hover:text-black'
             : 'bg-gray-medium text-white font-quicksand border border-gray-medium'
         }`}
        >
          {isLoading ? <Spinner size={6} /> : 'Submit review'}
        </button>
      </form>
      <p className="text-red-600">{errorMessage}</p>

      {allReviews?.results.map((review) => (
        <div key={review.id} className="flex flex-col mt-4">
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
        </div>
      ))}
    </>
  );
};

export default Reviews;
