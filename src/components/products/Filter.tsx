import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, Fragment, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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

type Input = {
  search: string;
};

const Filter = ({ categories }: FilterProps) => {
  const { state, updateStateProp } = useStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [test, setTest] = useState('');

  const filteringPricesRanges = [
    { name: '$0 - $10', slug: { minPrice: 0, maxPrice: 10 } },
    { name: '$10 - $20', slug: { minPrice: 10, maxPrice: 20 } },
    { name: '$20 - $30', slug: { minPrice: 20, maxPrice: 30 } },
    { name: '$30 - $40', slug: { minPrice: 30, maxPrice: 40 } },
    { name: '+$40', slug: { minPrice: 40, maxPrice: '' } },
    { name: 'All prices', slug: { minPrice: 0, maxPrice: '' } }
  ];

  const query = { ...router.query };

  useEffect(() => {
    inputRef.current?.focus();
    query.search && setTest(query.search as string);
  }, []);

  const handleSubmit = () => {
    console.log(test);
    test !== '' ? (query.search = test) : delete query.search;
    void router.push({ pathname: router.pathname, query }, undefined, { scroll: false });
  };

  const cleanSearchInput = () => {
    const query = { ...router.query };
    delete query.search;
    void router.push({ pathname: router.pathname, query }, undefined, { scroll: false });
    setTest('');
  };

  return (
    <Container className="pt-10">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col md:flex-row align-left md:items-center gap-5">
          <button
            onClick={() => updateStateProp('isFilterOpen', !state.isFilterOpen)}
            className="flex items-center gap-2"
          >
            Filters{' '}
            {state.isFilterOpen ? <MdOutlineClose className="text-red-700" /> : <BsFilter />}
          </button>
          <div className="flex items-center gap-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex items-center justify-between  mb-8 md:mb-0"
            >
              <input
                type="text"
                placeholder="Search..."
                id="search"
                onChange={(value) => setTest(value.target.value)}
                className={
                  'px-4 py-1 text-l border border-solid border-gray-300 rounded focus:outline focus:outline-2 focus:outline-secondary w-full md:w-[300px]'
                }
                value={test}
                ref={inputRef}
              />
              <button>
                <BsSearch className="ml-2" />
              </button>
            </form>
          </div>
          {test !== '' && (
            <Link href={{ pathname: '/products' }} scroll={false}>
              <button
                onClick={() => {
                  cleanSearchInput();
                }}
                className="text-red-500 hover:underline"
              >
                Clear search
              </button>
            </Link>
          )}
        </div>
        <SortBy />
      </div>
      <hr className="my-6" />

      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-3 overflow-hidden transition-all ease-in-out duration-300 mb-10
        ${state.isFilterOpen ? 'max-h-[1000px] mb-10' : 'max-h-0'}`}
      >
        <Link href={{ pathname: '/products' }} scroll={false}>
          <button
            onClick={() => {
              cleanSearchInput();
            }}
            className="font-bold hover:text-red-500"
          >
            Clear filters
          </button>
        </Link>
        {/* FilterBy CATEGORIES info is coming from the store */}
        <FilterBy title="Categories" items={categories} pathname={'products'} />
        {/*FilterBy PRICE*/}
        <FilterBy title="Prices" items={filteringPricesRanges} pathname={'products'} />
      </div>
    </Container>
  );
};

export default Filter;
