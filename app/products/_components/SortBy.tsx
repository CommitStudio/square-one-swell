import { Listbox, Transition } from '@headlessui/react';
import { useRouter, usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { BsChevronExpand } from 'react-icons/bs';
import { MdOutlineRemoveCircle, MdSort } from 'react-icons/md';

import { useCreateQueryString, useRemoveQueryString } from '~/_hooks/useQueryStringHandler';

type SortParam = {
  value: string;
  sort?: string;
};

const sortParams: SortParam[] = [
  { value: 'Choose one' },
  { value: 'Min. Price', sort: 'price asc' },
  { value: 'Max. Price', sort: 'price desc' },
  { value: 'A - Z', sort: 'name asc' },
  { value: 'Z - A', sort: 'name desc' },
  { value: 'Oldest', sort: 'date_created asc' },
  { value: 'Newest', sort: 'date_created desc' }
];

const SortBy = ({ query }: { query: FilterParams }) => {
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCreateQueryString();
  const removeQueryString = useRemoveQueryString();

  const selectedQuery = query.sort as string;
  const selectedParam = sortParams.find((param) => param.sort === selectedQuery);

  const [selected, setSelected] = useState(selectedParam || sortParams[0]);
  const [isOpen, setIsOpen] = useState(false);

  const isDefaultSort = selected.value === sortParams[0].value;

  /*****************************************************************************
   * Handle sort changes
   ****************************************************************************/
  const handleFilter = (param: SortParam) => {
    setIsOpen(false);
    setSelected(param);

    param.value !== sortParams[0].value ? (query.sort = param.sort) : delete query.sort;
    param.sort
      ? router.push(`${pathname}?${createQueryString('sort', param.sort)}`)
      : router.push(`${pathname}?${removeQueryString('sort')}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center font-quicksand">
      <div className="min-w-fit uppercase flex space-x-2">
        <MdSort className="text-xl" />
        <span>Sort by</span>
      </div>
      <div className="min-w-fit w-full md:w-40">
        <Listbox value={selected} onChange={handleFilter}>
          <div className="relative">
            <Listbox.Button
              onClick={() => {
                setIsOpen(true);
              }}
              className={`border-gray-medium ${
                selected === sortParams[0] ? 'text-gray-medium' : 'text-black'
              } relative w-full cursor-pointer rounded bg-white border py-1 px-4 text-left focus-visible:outline-secondary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
            >
              <span className="block truncate">{selected.value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronExpand className="h-8 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            {isOpen && (
              <Transition
                as={Fragment}
                leave="transition ease-in- duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute border border-black mt-1 max-h-fit w-full overflow-auto rounded-md bg-white py-1 z-10 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sortParams.slice(1).map((param, index) => (
                    <Listbox.Option
                      key={index}
                      className={'relative select-none cursor-pointer text-gray-500'}
                      value={param}
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate py-2 px-4 text-black hover:text-bold  ${
                            selected ? 'font-bold ring-opacity-5' : 'font-normal'
                          }`}
                        >
                          {param.value}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}

                  {isDefaultSort === false && (
                    <Listbox.Option
                      className={'relative select-none cursor-pointer text-gray-500'}
                      value={sortParams[0]}
                    >
                      <span className="flex items-center truncate py-2 px-4 hover:text-red-600 font-normal">
                        Remove
                        <MdOutlineRemoveCircle className="text-red-600 ml-1" />
                      </span>
                    </Listbox.Option>
                  )}
                </Listbox.Options>
              </Transition>
            )}
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default SortBy;
