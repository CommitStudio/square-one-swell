import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { BsSearch, BsFilter } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import { FilterBy } from './FilterBy';

import SortBy from './SortBy';

import { useStore } from '~/hooks/useStore';

import Container from '~/layouts/Container';

interface FilterProps {
  categories: Category[];
  pagination: Pagination;
  products: Product[];
}

const Filter = ({ categories, pagination, products }: FilterProps) => {
  const { state } = useStore();
  const { updateStateProp } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteringPricesRanges = [
    { name: '$0 - $10', slug: { minPrice: 0, maxPrice: 10 } },
    { name: '$10 - $20', slug: { minPrice: 10, maxPrice: 20 } },
    { name: '$20 - $30', slug: { minPrice: 20, maxPrice: 30 } },
    { name: '$30 - $40', slug: { minPrice: 30, maxPrice: 40 } },
    { name: '+$40', slug: { minPrice: 40, maxPrice: '' } },
    { name: 'All prices', slug: { minPrice: 0, maxPrice: '' } }
  ];

  return (
    <Container className="pt-10">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col md:flex-row align-left md:items-center">
          <button
            onClick={() => updateStateProp('isFilterOpen', !state.isFilterOpen)}
            className="flex items-center"
          >
            Filters{' '}
            {state.isFilterOpen ? (
              <MdOutlineClose className="text-2xl pl-[4px] text-red-700" />
            ) : (
              <BsFilter className="ml-2 text-lg" />
            )}
          </button>
          <button
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="flex items-center md:ml-4 my-4"
          >
            Search
            {isSearchOpen ? (
              <MdOutlineClose className="text-2xl pl-[4px] text-red-700" />
            ) : (
              <BsSearch className="ml-2" />
            )}
          </button>
          <div className="">
            <Transition
              as={Fragment}
              show={isSearchOpen}
              enter="transition-all ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-all ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <input
                type="text"
                placeholder="Search..."
                className={
                  'md:ml-4 my-2 px-4 py-1 text-l border border-solid border-gray-300 rounded'
                }
              />
            </Transition>
          </div>
        </div>
        <SortBy />
      </div>
      <hr className="my-6" />

      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-3 overflow-hidden transition-all ease-in-out duration-300 mb-10
        ${state.isFilterOpen ? 'max-h-[1000px] mb-10' : 'max-h-0'}`}
      >
        <div>
          <Link href={{ pathname: '/products' }} scroll={false}>
            <a className="font-bold mb-2 hover:text-red-500">Clear filters</a>
          </Link>
        </div>
        {/* FilterBy CATEGORIES info is coming from the store */}
        <FilterBy title="Categories" items={categories} pathname={'products'} />
        {/*FilterBy PRICE*/}
        <FilterBy title="Prices" items={filteringPricesRanges} pathname={'products'} />
      </div>
    </Container>
  );
};

export default Filter;
