import React from 'react';
import Rater from 'react-rater';

const WriteAReview = () => {
  return (
    <div>
      <div>
        <p className="text-lg font-bold">Write a review</p>
        <p className="mt-5">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>
      <div className="flex space-x-3 items-center mt-3">
        <p>Rating:</p>
        <Rater total={5} rating={0} />
      </div>
      <div className="mt-3">
        <p>Review*</p>
        <textarea className="border border-gray-200 w-full h-[150px] p-3 mt-2" />
        <div className="md:flex space-y-3 md:space-y-0 md:space-x-10 mt-3">
          <div>
            <label className="block" htmlFor="name">
              Name
            </label>
            <input type="text" id="name" className="border border-gray-200" />
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input type="email" id="email" className="border border-gray-200" />
          </div>
        </div>
        <div className="flex mt-6 space-x-2 items-center">
          <input name="notify-box" id="notify-box" type="checkbox" />
          <label htmlFor="notify-box">Notify me of new posts by email</label>
        </div>
        <button className="bg-secondary text-white hover:bg-primary hover:text-secondary duration-200 px-5 py-2 rounded mt-5">
          SUMBIT
        </button>
      </div>
    </div>
  );
};

export default WriteAReview;
