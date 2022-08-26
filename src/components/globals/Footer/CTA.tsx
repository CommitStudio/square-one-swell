import React from 'react';

const CTA = () => {
  return (
    <div className="bg-[#fafafa] w-full text-secondary flex flex-col space-y-3 md:space-y-0 md:flex-row justify-around p-5 items-center">
      <div className="text-xl">Sign up for Send Newsletter</div>
      <div className="flex ">
        <input
          type="text"
          className="border focus:outline-0 md:w-[350px] border-gray-400 rounded-tl-md rounded-bl-md p-2"
          placeholder="Your email"
        />
        <button className="bg-secondary w-full md:w-[200px] text-white hover:text-secondary p-2 hover:bg-primary rounded-tr-md rounded-br-md">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default CTA;
