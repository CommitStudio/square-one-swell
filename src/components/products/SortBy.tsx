import { Listbox, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { BsChevronExpand } from 'react-icons/bs';

import { v4 as uuidv4 } from 'uuid';

import { useStore } from '~/hooks/useStore';

const sortParams = [
  // { value: 'Relevant' },
  // { value: 'Min. Price' },
  // { value: 'Max. Price' },
  // { value: 'Newer' },
  // { value: 'Older' },
  { value: 'A to Z', slug: { sort: 'name asc' } },
  { value: 'Z to A', slug: { sort: 'name desc' } }
];

const SortBy = () => {
  const router = useRouter();

  const [selected, setSelected] = useState(sortParams[0]);
  const { state } = useStore();
  const { updateStateProp } = useStore();
  // console.log(state.sortBy);

  return (
    <div className="flex items-center">
      <span className="ml-10 mr-2 text-sm">Sort by:</span>
      <div className="min-w-fit w-32">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected.value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {sortParams.map((param) => (
                  <Listbox.Option
                    key={uuidv4()}
                    className={({ active }) =>
                      `relative select-none py-2 px-4 cursor-pointer ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-500'
                      }`
                    }
                    value={param}
                  >
                    {({ selected }) => (
                      <>
                        <Link
                          href={{
                            pathname: 'products',
                            query: { ...router.query, ...param.slug }
                          }}
                          onClick={() => updateStateProp('sortBy', param.value)}
                          className={`block truncate ${
                            selected ? 'font-bold text-secondary' : 'font-normal'
                          }`}
                        >
                          {param.value}
                        </Link>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default SortBy;
