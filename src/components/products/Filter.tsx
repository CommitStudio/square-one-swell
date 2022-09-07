import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import filterJson from '~/data/products/filter.json';
import Container from '~/layouts/Container';
const { filter } = filterJson;

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <Container className="pt-10">
      <div className="md:flex md:justify-between">
        <p className="mb-2 md:mb-0">Showing 1-8 of 56 Products</p>
        <div className="flex">
          <button onClick={() => setIsFilterOpen((prev) => !prev)} className="mr-2">
            Filters
          </button>
          /
          <button
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="flex items-center ml-2"
          >
            Search
            {isSearchOpen ? (
              <MdOutlineClose className="text-2xl pl-[4px] text-red-700" />
            ) : (
              <BsSearch className="ml-2" />
            )}
          </button>
        </div>
      </div>
      <hr className="my-10" />
      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-3 overflow-hidden transition-all duration-500 ease-in-out ${
          isFilterOpen ? 'max-h-[1000px] md:max-h-96 lg:max-h-52 mb-10' : 'max-h-0'
        }`}
      >
        {filter.categories.map((category, i) => {
          return (
            <div key={i}>
              <h5 className="font-bold mb-2" key={i}>
                {category.title}
              </h5>
              <p key={i} className="cursor-pointer w-fit text-gray-500 hover:text-secondary">
                {category.attribute1}
              </p>
              <p key={i} className="cursor-pointer w-fit text-gray-500 hover:text-secondary">
                {category.attribute2}
              </p>
              <p key={i} className="cursor-pointer w-fit text-gray-500 hover:text-secondary">
                {category.attribute3}
              </p>
              <p key={i} className="cursor-pointer w-fit text-gray-500 hover:text-secondary">
                {category.attribute4}
              </p>
              <p key={i} className="cursor-pointer w-fit text-gray-500 hover:text-secondary">
                {category.attribute5}
              </p>
              <p key={i} className="cursor-pointer w-fit text-gray-500 hover:text-secondary">
                {category.attribute6}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out origin-top ${
          isSearchOpen ? 'max-h-52 mb-10 pb-2' : 'max-h-0'
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="border-b w-full outline-none text-xl focus:border-b-secondary pb-2"
        />
      </div>
    </Container>
  );
};

export default Filter;
