import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import { FilterBy } from './FilterBy';
import Showing from './Showing';

import SortBy from './SortBy';

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

  const filteringPricesRanges = [
    { name: '$0 - $10', slug: { minPrice: 0, maxPrice: 10 } },
    { name: '$10 - $20', slug: { minPrice: 10, maxPrice: 20 } },
    { name: '$20 - $30', slug: { minPrice: 20, maxPrice: 30 } },
    { name: '$30 - $40', slug: { minPrice: 30, maxPrice: 40 } },
    { name: '+$40', slug: { minPrice: 40, maxPrice: '' } }
  ];

  return (
    <Container className="pt-10">
      <div className="md:flex md:justify-between">
        <Showing className="mb-2 md:mb-0" pagination={pagination} />
        <div className="flex items-center">
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
          <SortBy />
        </div>
      </div>
      <hr className="my-10" />
      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-3 overflow-hidden transition-all duration-500 ease-in-out mb-10
        ${state.isFilterOpen ? 'max-h-[1000px] mb-10' : 'max-h-0'}`}
      >
        {/* FilterBy Categories info is coming from the store */}
        {/* TODO: Add others filters coming from the Store*/}
        <FilterBy title="Categories" items={categories} pathname={'products'} />
        <FilterBy title="Prices" items={filteringPricesRanges} pathname={'products'} />
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
