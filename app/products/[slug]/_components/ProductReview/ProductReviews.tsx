import { UseFormSetValue } from 'react-hook-form';
import Rater from 'react-rater';

import EditIcon from 'public/img/icons/EditIcon';

import TrashIcon from 'public/img/icons/TrashIcon';
import { Spinner } from '~/_components/Globals/Spinner';

type Inputs = {
  title: string;
  comments: string;
  rating: string;
  reviewId: string;
};

interface Props {
  allReviews: null | Reviews;
  userId: string | null;
  setIsEditing: (arg0: boolean) => void;
  isDeleteReviewLoading: boolean;
  setValue: UseFormSetValue<Inputs>;
  handleDelete: (reviewId: string) => Promise<void>;
}

const ProductReviews = ({
  allReviews,
  userId,
  handleDelete,
  isDeleteReviewLoading,
  setIsEditing,
  setValue
}: Props) => {
  const editReview = (review: Review) => {
    setIsEditing(true);
    setValue('title', review.title);
    setValue('comments', review.comments);
    setValue('rating', review.rating.toString());
    setValue('reviewId', review.id);
    const formReview = document?.getElementById('form-review');
    if (formReview) {
      formReview.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      {allReviews?.results.map((review) => (
        <div key={review.id} className="flex flex-col items-start">
          <div className={`flex flex-col py-3 border-b border-gray font-quicksand w-full`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="text-lg font-semibold">{review.name}</div>
              {new Date(review.date_created).toISOString().split('T')[0]}
            </div>
            <Rater total={5} rating={review.rating} interactive={false} />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold my-2">{review.title}</p>
                {review.comments}
              </div>
              <div className="space-x-3">
                {userId === review.account_id && (
                  <button
                    onClick={() => {
                      editReview(review);
                    }}
                    className="font-bold self-end p-2 rounded border border-black font-quicksand text-black duration-200 cursor-pointer"
                  >
                    <EditIcon strokeColor="black" />
                  </button>
                )}
                {userId === review.account_id && (
                  <button
                    onClick={() => {
                      handleDelete(review.id).catch((err) => console.log(err));
                    }}
                    disabled={isDeleteReviewLoading}
                    className={`font-bold font-quicksand self-end p-2 rounded
                               ${
                                 !isDeleteReviewLoading
                                   ? 'bg-black border border-black text-white duration-200 cursor-pointer'
                                   : 'bg-gray-medium text-white border border-gray-medium'
                               }`}
                  >
                    {isDeleteReviewLoading ? (
                      <Spinner size={4} />
                    ) : (
                      <TrashIcon strokeColor="white" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductReviews;
