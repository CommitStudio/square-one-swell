import { useState } from 'react';
import { BsSearch, BsFilter } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import { FilterBy, FilterItem, FilterByProps } from './FilterBy';

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
    { name: '+$40', slug: { minPrice: 40, maxPrice: '' } }
  ];

  type OptionsList = {
    [k: string]: string[];
  };
  type OptionsFilter = { [k: string]: FilterByProps };

  function getOptionsFilter(products: Product[]): OptionsFilter {
    const optionList: OptionsList = {};
    const filters: OptionsFilter = {};

    products.forEach((product: Product) => {
      const options = product.options;
      options?.map((option) => {
        //if the option doesn't exist under Option, create it
        if (!(option.label in optionList)) {
          optionList[option.label] = [];
        }
        //push the values for each label.
        optionList[option.label].push(...option.values);
      });
      //remove duplicates values and convert result to the object expected in the component
      for (const label in optionList) {
        const cleanList = optionList[label]
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          })
          // generate clean list
          .map((item: string) => {
            return { name: item, slug: { category: item } };
          });
        // object expected in Filter (o FilterBy (fijarese)) component
        filters[label] = {
          title: label,
          pathname: '', //ver que poner aca
          items: cleanList
        };
      }
    });
    return filters;
  }

  const optionsList = getOptionsFilter(products);
  const optionsRendered: JSX.Element[] = [];

  return (
    <Container className="pt-10">
      <div className="md:flex md:justify-between">
        <div className="flex">
          <button
            onClick={() => updateStateProp('isFilterOpen', !state.isFilterOpen)}
            className="flex items-center"
          >
            Filters{' '}
            {state.isFilterOpen ? (
              <MdOutlineClose className="text-2xl pl-[4px] text-red-700" />
            ) : (
              <BsFilter className="ml-2" />
            )}
          </button>
          <button
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="flex items-center ml-4"
          >
            Search
            {isSearchOpen ? (
              <MdOutlineClose className="text-2xl pl-[4px] text-red-700" />
            ) : (
              <BsSearch className="ml-2" />
            )}
          </button>
          <div
            className={` items-center overflow-hidden transition-all ease-in-out duration-300 origin-left ${
              isSearchOpen ? 'max-h-10 ' : 'max-h-0'
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full ml-4  outline-none text-l focus:border-b-secondary"
            />
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-3 overflow-hidden transition-all duration-500 ease-in-out mb-10
        ${state.isFilterOpen ? 'max-h-[1000px] mb-10' : 'max-h-0'}`}
      >
        {/* FilterBy CATEGORIES info is coming from the store */}
        <FilterBy title="Categories" items={categories} pathname={'products'} />
        {/*FilterBy OPTIONS of the products, coming form the store */}
        {Object.keys(optionsList).forEach((key: string) => {
          const title = key;
          const items: FilterItem[] = optionsList[title].items;
          optionsRendered.push(<FilterBy title={title} items={items} pathname={'products'} />);
        })}
        {optionsRendered}
        {/*FilterBy PRICE*/}
        <FilterBy title="Prices" items={filteringPricesRanges} pathname={'products'} />
      </div>
    </Container>
  );
};

export default Filter;
