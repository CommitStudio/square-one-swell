import React from 'react';
import {
  FieldErrorsImpl,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import Rater from 'react-rater';

import Button from '~/_components/Button';
import { Spinner } from '~/_components/Globals/Spinner';

type Inputs = {
  title: string;
  comments: string;
  rating: string;
  reviewId: string;
};
interface Props {
  register: UseFormRegister<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  errors: Partial<
    FieldErrorsImpl<{ title: string; comments: string; rating: string; reviewId: string }>
  >;
  isPostReviewLoading: boolean;
  isEditing: boolean;
}

const WriteAReview = ({
  register,
  onSubmit,
  handleSubmit,
  errors,
  isPostReviewLoading,
  isEditing,
  setValue
}: Props) => {
  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      id="form-review"
      className="scroll-mt-40"
    >
      <div>
        <p className="text-lg font-bold">Write a review:</p>
      </div>
      <div className="mt-3">
        <p>Rating:</p>
        <Rater total={5} rating={0} onRate={({ rating }) => setValue('rating', rating as string)} />
      </div>
      {errors.rating && <p className="text-red-600 text-xs">{errors.rating.message}</p>}
      <div className="mt-4">
        <label className="block" htmlFor="name">
          Title
        </label>
        <input
          type="text"
          className="border border-black rounded-lg p-3"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="text-red-600 text-xs">{errors.title.message}</p>}
      </div>
      <div className="mt-4">
        <p>Review*</p>
        <textarea
          className="border border-black rounded w-full h-[150px] p-3"
          {...register('comments', { required: 'Comments are required' })}
        />
        {errors.comments && <p className="text-red-600 text-xs">{errors.comments.message}</p>}
        <Button
          type="submit"
          disabled={isPostReviewLoading}
          className={`font-bold py-3 px-5 rounded-lg mt-3
         ${
           isEditing
             ? 'bg-green border border-green text-white duration-200 cursor-pointer hover:bg-white hover:text-green hover:border-green'
             : !isPostReviewLoading
             ? 'bg-black text-white duration-200 cursor-pointer hover:bg-white hover:text-black'
             : 'bg-gray-medium text-white font-quicksand border border-gray-medium'
         }`}
          label={
            isPostReviewLoading ? <Spinner size={6} /> : isEditing ? 'Edit review' : 'Submit review'
          }
        />
      </div>
    </form>
  );
};

export default WriteAReview;
