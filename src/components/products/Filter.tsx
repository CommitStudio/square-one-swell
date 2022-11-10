import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BsSearch, BsFilter } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
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

const Filter = ({ categories, pagination, products }: FilterProps) => {
  const router = useRouter();
  const { state } = useStore();
  const { updateStateProp } = useStore();

  const filteringPricesRanges = [
    { name: '$0 - $10', slug: { minPrice: 0, maxPrice: 10 } },
    { name: '$10 - $20', slug: { minPrice: 10, maxPrice: 20 } },
    { name: '$20 - $30', slug: { minPrice: 20, maxPrice: 30 } },
    { name: '$30 - $40', slug: { minPrice: 30, maxPrice: 40 } },
    { name: '+$40', slug: { minPrice: 40, maxPrice: '' } },
    { name: 'All prices', slug: { minPrice: 0, maxPrice: '' } }
  ];

  const { register, handleSubmit, reset } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    const query = { ...router.query };
    data.search !== '' ? (query.search = data.search) : delete query.search;
    void router.push({ pathname: router.pathname, query }, undefined, { scroll: false });
  };

  const cleanSearchInput = () => {
    const query = { ...router.query };
    delete query.search;
    void router.push({ pathname: router.pathname, query }, undefined, { scroll: false });
    reset({ search: '' });
  };

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
            onClick={() => {
              updateStateProp('isSearchOpen', !state.isSearchOpen);
              state.isSearchOpen && cleanSearchInput();
            }}
            className="flex items-center md:ml-8 my-4"
          >
            Search
            {state.isSearchOpen ? (
              <MdOutlineClose className="text-2xl pl-[4px] text-red-700" />
            ) : (
              <BsSearch className="ml-2" />
            )}
          </button>
          <div>
            <Transition
              as={Fragment}
              show={state.isSearchOpen}
              enter="transition-all ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-all ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <form
                onSubmit={(e) => {
                  void handleSubmit(onSubmit)(e);
                }}
                className="flex items-center justify-between border-none mb-8 md:mb-0 md:ml-4"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  autoComplete="off"
                  autoFocus={true}
                  className="py-2 pl-1 pr-4 text-l border-b-2 border-secondary sm:py-1.5 focus:outline-none"
                  {...register('search')}
                />
                <button
                  type="submit"
                  title="Search"
                  className="py-2 px-1 text-2xl text-secondary border-b-2 border-secondary sm:py-1.5"
                >
                  <HiOutlineArrowNarrowRight />
                </button>
              </form>
            </Transition>
          </div>
        </div>
        <SortBy className="flex items-center" />
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
