import Filter from './_components/Filter';
import Showing from './_components/Showing';
import ShowingFiltered from './_components/ShowingFiltered';

import Hero from '~/_components/Globals/Hero';
import { NoResults } from '~/_components/Globals/NoResults';
import ProductList from '~/_components/Globals/ProductList';
import Pagination from '~/_components/Pagination';

import keywords from '~/_data/keywords.json';
import Store from '~/_lib/Store';
import { isAuthenticated } from '~/_lib/SwellAPI';

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
  const auth = await isAuthenticated();

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

          <ProductList threeColumns products={products} isAuthenticated={auth} />

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
