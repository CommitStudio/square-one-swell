import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { BsFilter } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import Search from './Search';

import { FilterBy } from '~/components/products/FilterBy';
import SortBy from '~/components/products/SortBy';
import { useStore } from '~/hooks/useStore';
import Container from '~/layouts/Container';

interface FilterProps {
  categories: Category[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const Filter = ({ categories, searchValue, setSearchValue }: FilterProps) => {
  const { state, updateStateProp, updateState } = useStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

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
    query.search && setSearchValue(query.search as string);
  }, []);

  const handleSubmit = () => {
    searchValue !== '' ? (query.search = searchValue) : delete query.search;
    void router.push({ pathname: router.pathname, query }, undefined, { scroll: false });
  };

  const cleanSearchInput = () => {
    const query = { ...router.query };
    delete query.search;
    void router.push({ pathname: router.pathname, query }, undefined, { scroll: false });
    setSearchValue('');
    updateState({
      ...state,
      isFilterOpen: !state.isFilterOpen,
      breadcrumbSelectedCategory: '',
      breadcrumbMainRoute: 'Products'
    });
    window.scrollTo(0, 0);
  };

  return (
    <Container className="pt-6 font-quicksand">
      <div className="flex flex-col md:flex-row md:justify-between gap-3">
        <div className="flex flex-col md:flex-row align-left md:items-center gap-3">
          <button
            onClick={() => updateStateProp('isFilterOpen', !state.isFilterOpen)}
            className="flex font-normal items-center gap-2 uppercase focus:outline-secondary"
          >
            {state.isFilterOpen ? (
              <MdOutlineClose className="text-black text-xl" />
            ) : (
              <BsFilter className="text-xl" />
            )}
            FILTERS
          </button>
          {/* search section */}
          <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            inputRef={inputRef}
            handleSubmit={handleSubmit}
          />
          {searchValue !== '' && (
            <Link href={{ pathname: '/products' }} scroll={false}>
              <button
                onClick={() => {
                  cleanSearchInput();
                }}
                className="text-black hover:underline mb-3 md:mb-0"
              >
                Clear search
              </button>
            </Link>
          )}
        </div>
        <SortBy />
      </div>
      <hr className="mt-6 border-gray-medium" />
      <div>
        <div
          className={` font-quick overflow-hidden transition-all ease-in-out duration-300 mb-10
        ${state.isFilterOpen ? 'max-h-[1000px] mb-10' : 'max-h-0'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-3 mb-8">
            {/* FilterBy CATEGORIES info is coming from the store */}
            <FilterBy title="Gender" items={categories} pathname={'products'} />
            <FilterBy title="Categories" items={categories} pathname={'products'} />
            {/*FilterBy PRICE*/}
            <FilterBy title="Prices" items={filteringPricesRanges} pathname={'products'} />
          </div>
          <Link href={{ pathname: '/products' }} scroll={false}>
            <button
              onClick={() => {
                cleanSearchInput();
              }}
              className="hover:font-bold underline"
            >
              Clear filters
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Filter;
