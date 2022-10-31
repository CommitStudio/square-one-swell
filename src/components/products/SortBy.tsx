import { Listbox, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { BsChevronExpand } from 'react-icons/bs';
import { MdOutlineRemoveCircle, MdSort } from 'react-icons/md';

import { v4 as uuidv4 } from 'uuid';

const sortParams = [
  { value: 'Choose one' },
  { value: 'Min. Price', slug: { sort: 'price asc' } },
  { value: 'Max. Price', slug: { sort: 'price desc' } },
  { value: 'A - Z', slug: { sort: 'name asc' } },
  { value: 'Z - A', slug: { sort: 'name desc' } },
  { value: 'Older', slug: { sort: 'date_created asc' } },
  { value: 'Newer', slug: { sort: 'date_created desc' } },
  { value: 'Remove' }
];

const SortBy = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(sortParams[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen);

  return (
    <div className="flex items-center ml-10">
      <MdSort className="text-xl" />
      <span className="ml-1 mr-2 text-sm">Sort by:</span>
      <div className="min-w-fit w-32">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button
              onClick={() => {
                setIsOpen(true);
                // console.log(isOpen);
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
                <Listbox.Options
                  className={`absolute mt-1 max-h-fit w-full overflow-auto rounded-md bg-white py-1 z-20 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                >
                  {sortParams.slice(1).map((param) => (
                    <Listbox.Option
                      key={uuidv4()}
                      className={'relative select-none cursor-pointer text-gray-500'}
                      value={param}
                    >
                      {({ selected }) => (
                        <>
                          {param.value !== 'Remove' ? (
                            <Link
                              href={{
                                pathname: 'products',
                                query: { ...router.query, ...param.slug }
                              }}
                              scroll={false}
                            >
                              <span
                                onClick={() => {
                                  setSelected(param);
                                  setIsVisible(true);
                                  setIsOpen(false);
                                  // console.log(isOpen);
                                }}
                                className={`block truncate py-2 px-4 hover:text-secondary ${
                                  selected ? `font-bold text-secondary` : 'font-normal'
                                }`}
                              >
                                {param.value}
                              </span>
                            </Link>
                          ) : (
                            <Link
                              href={{
                                pathname: 'products'
                              }}
                              scroll={false}
                            >
                              <span
                                onClick={() => {
                                  setSelected(sortParams[0]);
                                  setIsVisible(false);
                                  setIsOpen(false);
                                  // console.log(isOpen);
                                }}
                                className={`flex items-center truncate py-2 px-4 font-normal hover:text-red-600 ${
                                  isVisible ? 'block' : 'hidden'
                                }`}
                              >
                                {param.value}
                                <MdOutlineRemoveCircle className="text-red-600 ml-1" />
                              </span>
                            </Link>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
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
