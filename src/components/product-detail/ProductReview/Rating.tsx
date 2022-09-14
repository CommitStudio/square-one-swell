/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import Rater from 'react-rater';

const Rating = () => {
  return (
    <div className="flex">
      <div className="rounded-full overflow-hidden flex justify-center w-32 h-20 md:h-auto bg-gray-200 items-center relative">
        <Image src="/img/products/black-tank-top.jpg" alt="test" layout="fill" objectFit="cover" />
      </div>
      <div className="w-full flex flex-col justify-center ml-10">
        <div className="flex justify-between">
          <div className="text-lg font-semibold">Nombre</div>
          <div>
            <Rater total={5} rating={0} />
          </div>
        </div>
        <div className="mt-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus nesciunt minus rem
          consectetur natus nobis doloremque numquam laboriosam in ipsa, nulla dolorum nostrum iste
          neque odio nemo, dolor laudantium modi nam impedit amet labore. Voluptates ullam adipisci
          nesciunt temporibus tempore.
        </div>
      </div>
    </div>
  );
};

export default Rating;
