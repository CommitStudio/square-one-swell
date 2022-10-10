import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import { FilterBy } from './FilterBy';
import Showing from './Showing';

import { useStore } from '~/hooks/useStore';

import Container from '~/layouts/Container';

interface FilterProps {
  categories: Category[];
  pagination: Pagination;
}

const Filter = ({ categories, pagination }: FilterProps) => {
  const { state } = useStore();
  const { updateStateProp } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Container className="pt-10">
      <div className="md:flex md:justify-between">
        <Showing className="mb-2 md:mb-0" pagination={pagination} />
        <div className="flex">
          <button
            onClick={() => updateStateProp('isFilterOpen', !state.isFilterOpen)}
            className="mr-2"
          >
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
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-3 overflow-hidden transition-all duration-500 ease-in-out mb-10
        ${state.isFilterOpen ? 'max-h-[1000px] md:max-h-96 lg:max-h-52 mb-10' : 'max-h-0'}`}
      >
        {/* FilterBy Categories info is coming from the store */}
        {/* TODO: Add others filters coming from the Store*/}
        <FilterBy title="Categories" items={categories} pathname={'products'} />
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
