import ProductCard from './ProductCard';

import Container from '~/_layouts/Container';
import { isAuthenticated } from '~/_lib/SwellAPI';
import { toggleWishlistAction, getWishlistAction } from '~/products/_actions/wishlist';

interface Props {
  relatedProducts?: boolean;
  threeColumns?: boolean;
  products?: Product[];
}

const ProductList = async ({ relatedProducts, threeColumns, products }: Props) => {
  const auth = await isAuthenticated();

  return (
    <Container className="mb-10">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
          threeColumns
            ? 'lg:grid-cols-3'
            : relatedProducts
            ? 'lg:flex justify-center'
            : 'lg:grid-cols-4'
        }  gap-y-4 justify-items-center`}
      >
        {products?.map((product, i) => (
          <ProductCard
            product={product}
            toggleWishlistAction={toggleWishlistAction}
            getWishlistAction={getWishlistAction}
            isAuthenticated={auth}
            key={`card-${i}`}
          />
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
