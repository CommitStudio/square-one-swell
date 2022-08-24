import React from 'react';

const CTA = () => {
  return (
    <div className="bg-white w-full text-secondary flex flex-col space-y-3 md:space-y-0 md:flex-row justify-around p-5 border border-t-secondary items-center">
      <div className="text-xl">Sign up for Send Newsletter</div>
      <div className="flex">
        <input
          type="text"
          className="border border-secondary placeholder:p-2"
          placeholder="Your email"
        />
        <button className="bg-secondary text-white w-full h-full p-2 hover:bg-primary">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default CTA;
