import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { BsSearch } from 'react-icons/bs';

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
  handleSubmit: () => void;
}

const Search = ({ handleSubmit, searchValue, setSearchValue, inputRef }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex items-center"
    >
      <input
        type="text"
        placeholder="Search..."
        id="search"
        onChange={(value) => setSearchValue(value.target.value)}
        className={
          'px-4 py-1 text-l border border-solid border-gray-medium rounded focus:outline-1 focus:outline-secondary w-full md:w-[300px]'
        }
        value={searchValue}
        ref={inputRef}
      />
      <button className="focus:outline focus-visible:outline-secondary focus:py-2 focus:rounded">
        <BsSearch className="mx-4" />
      </button>
    </form>
  );
};

export default Search;
