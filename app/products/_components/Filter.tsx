'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import Categories from './Categories';
import Search from './Search';
import SortBy from './SortBy';

import { useCreateQueryString, useRemoveQueryString } from '~/_hooks/useQueryStringHandler';
import { useStore } from '~/_hooks/useStore';
import Container from '~/_layouts/Container';

interface FilterProps {
  categories: Category[];
  query: FilterParams;
}

const Filter = ({ categories, query }: FilterProps) => {
  const router = useRouter();

  const createQueryString = useCreateQueryString();
  const removeQueryString = useRemoveQueryString();

  const { state, updateStateProp, updateState } = useStore();
  const [searchValue, setSearchValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    inputRef.current?.focus();
    query.search && setSearchValue(query.search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    searchValue
      ? router.push(`${pathname}?${createQueryString('search', searchValue)}`)
      : router.push(`${pathname}?${removeQueryString('search')}`);
  };

  const cleanSearchInput = () => {
    router.push(`${pathname}?${removeQueryString('search')}`);

    setSearchValue('');

    updateState({
      ...state,
      isFilterOpen: (state.isFilterOpen = false),
      breadcrumbSelectedCategory: '',
      breadcrumbMainRoute: 'Products'
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <button
              onClick={() => {
                cleanSearchInput();
              }}
              className="text-black hover:underline mb-3 md:mb-0"
            >
              Clear search
            </button>
          )}
        </div>
        <SortBy query={query} />
      </div>
      <hr className="mt-6 border-gray-medium" />
      <div
        className={`grid font-quick overflow-hidden transition-all ease-in-out duration-300 mb-10
        ${
          state.isFilterOpen
            ? 'grid-rows-[1fr] mb-10 border-b border-gray-medium pb-2'
            : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <Categories categories={categories} query={query} />
          <Link href={{ pathname: '/products' }} scroll={false} legacyBehavior>
            <button
              onClick={() => {
                cleanSearchInput();
              }}
              className="hover:font-bold underline transition-opacity duration-300"
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
