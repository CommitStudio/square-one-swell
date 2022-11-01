import { Listbox, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { BsChevronExpand } from 'react-icons/bs';
import { MdOutlineRemoveCircle, MdSort } from 'react-icons/md';

import { v4 as uuidv4 } from 'uuid';

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
  { value: 'Older', sort: 'date_created asc' },
  { value: 'Newer', sort: 'date_created desc' }
];

const SortBy = () => {
  const router = useRouter();

  const selectedQuery = router.query.sort as string;
  const selectedParam = sortParams.find((param) => param.sort === selectedQuery);

  const [selected, setSelected] = useState(selectedParam || sortParams[0]);
  const [isOpen, setIsOpen] = useState(false);

  /*****************************************************************************
   * Handle sort changes
   ****************************************************************************/
  const handleFilter = (param: SortParam) => {
    setSelected(param);
    const query = { ...router.query };
    param.value !== sortParams[0].value ? (query.sort = param.sort) : delete query.sort;
    void router.push({ pathname: router.pathname, query });
  };

  return (
    <div className="flex items-center ml-10">
      <MdSort className="text-xl" />
      <span className="ml-1 mr-2 text-sm">Sort by:</span>
      <div className="min-w-fit w-32">
        <Listbox value={selected} onChange={handleFilter}>
          <div className="relative">
            <Listbox.Button
              onClick={() => {
                setIsOpen(true);
              }}
              className="relative w-full cursor-pointer rounded-lg bg-white border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span className="block truncate">{selected.value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            {isOpen ? (
              <Transition
                as={Fragment}
                leave="transition ease-in- duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-fit w-full overflow-auto rounded-md bg-white py-1 z-20 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sortParams.slice(1).map((param) => (
                    <Listbox.Option
                      key={uuidv4()}
                      className={'relative select-none cursor-pointer text-gray-500'}
                      value={param}
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate py-2 px-4 hover:text-secondary ${
                            selected ? `font-bold text-secondary` : 'font-normal'
                          }`}
                        >
                          {param.value}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}

                  <Listbox.Option
                    key={uuidv4()}
                    className={'relative select-none cursor-pointer text-gray-500'}
                    value={sortParams[0]}
                  >
                    <span className="block truncate py-2 px-4 hover:text-secondary font-normal">
                      Remove
                    </span>
                  </Listbox.Option>
                </Listbox.Options>
              </Transition>
            ) : null}
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default SortBy;
