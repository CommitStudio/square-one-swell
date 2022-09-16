import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import { FilterBy } from './FilterBy';

import filterJson from '~/data/products/filter.json';
import Container from '~/layouts/Container';

// interface FilterItem {
//   name: string;
//   slug: string | { minPrice: number; maxPrice: number | string };
// }
// interface FilterObject {
//   title: string;
//   items: FilterItem[];
// }
const { filterBy } = filterJson;

interface FilterProps {
  products: Product[];
  categories: Category[];
}

const Filter = ({ products, categories }: FilterProps) => {
  //  console.log(categories);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <Container className="pt-10">
      <div className="md:flex md:justify-between">
        <p className="mb-2 md:mb-0">Showing 1-8 of 56 Products</p>
        <div className="flex">
          <button onClick={() => setIsFilterOpen((prev) => !prev)} className="mr-2">
            Filters
          </button>
          /
          <button
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="flex items-center ml-2"
          >
            Search
            {isSearchOpen ? (
              <MdOutlineClose className="text-2xl pl-[4px] text-red-700" />
            ) : (
              <BsSearch className="ml-2" />
            )}
          </button>
        </div>
      </div>
      <hr className="my-10" />
      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-3 overflow-hidden transition-all duration-500 ease-in-out ${
          isFilterOpen ? 'max-h-[1000px] md:max-h-96 lg:max-h-52 mb-10' : 'max-h-0'
        }`}
      >
        {/* Componente individual para cada lista, y vamos agregando un componente, con su titulo y lo que queremos listar(con un map adentro, ejemplo las categorias) */}
        {filterBy.map((item, i) => {
          return <FilterBy key={i} title={item.title} items={item.items} pathname={'products'} />;
        })}
        {/* <FilterBy title="Sort By" items={filterBy['Sort By']} pathname={'products'} />
        <FilterBy title="Price" items={filterBy['Price']} pathname={'products'} />
        <FilterBy title="Colors" items={filterBy['Colors']} pathname={'products'} />
        <FilterBy title="Size" items={filterBy['Size']} pathname={'products'} /> */}
        <FilterBy title="Categories" items={categories} pathname={'products'} />
        {console.log(typeof categories, 'type of categories')}
        {console.log(typeof filterBy, 'type of Price')}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out origin-top ${
          isSearchOpen ? 'max-h-52 mb-10 pb-2' : 'max-h-0'
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="border-b w-full outline-none text-xl focus:border-b-secondary pb-2"
        />
      </div>
    </Container>
  );
};

export default Filter;
