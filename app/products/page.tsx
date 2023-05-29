import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';

import { NoResults } from '~/components/globals/NoResults';
import Pagination from '~/components/globals/Pagination';
import Filter from '~/components/products/Filter';
import Showing from '~/components/products/Showing';
import ShowingFiltered from '~/components/products/ShowingFiltered';

import keywords from '~/data/keywords.json';
import Store from '~/lib/Store';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - Products',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.products,
  url: `${NEXT_PUBLIC_BASE_URL}/products`
};

const getData = async (searchParams: FilterParams) => {
  const { maxProducts, minPrice, maxPrice, category, page, sort, search } = searchParams;

  const categories = await Store.getCategories();
  const { products, pagination } = await Store.getProducts({
    maxPrice: Number(maxPrice),
    maxProducts: Number(maxProducts),
    page: Number(page),
    sort: sort,
    minPrice: Number(minPrice),
    category: category,
    search: search
  });

  return { categories, products, pagination };
};

const Products = async ({ searchParams }: { searchParams: FilterParams }) => {
  const { categories, products, pagination } = await getData(searchParams);
  const filterKeys = Object.keys(searchParams).filter((key) => key !== 'page' && key !== 'sort');

  return (
    <>
      <Hero />
      <Filter categories={categories} query={searchParams} />
      {products.length > 0 ? (
        <>
          {filterKeys && filterKeys.length > 0 && (
            <ShowingFiltered products={products} query={searchParams} />
          )}
          <ProductList threeColumns products={products} />
          {pagination.pages.length > 0 && (
            <Pagination pagination={pagination} query={searchParams} />
          )}
          <Showing className="mb-2 md:my-10 text-center font-quicksand" pagination={pagination} />
        </>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default Products;
