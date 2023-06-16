'use client';

import ProductCard from './ProductCard';

import useFetch from '~/_hooks/useFetch';
import { useWishlistState } from '~/_hooks/useStore';

import Container from '~/_layouts/Container';

interface Props {
  relatedProducts?: boolean;
  threeColumns?: boolean;
  products?: Product[];
  isAuthenticated?: boolean;
}

const ProductList = ({ relatedProducts, threeColumns, products, isAuthenticated }: Props) => {
  const { wishlist, setWishlist } = useWishlistState();

  /** Get user wishlist */
  const wishlistUrl = isAuthenticated ? '/api/wishlist/' : null;
  const { data } = useFetch<{ wishlist: string[] }>(wishlistUrl);

  /** Once wishlist is retrieved, set it to the store */
  if (data && wishlist.length === 0) {
    setWishlist(data.wishlist);
  }

  return (
    <Container className="mb-10">
      <pre className="p-2 bg-gray-100 border-2 border-gray-200 whitespace-pre overflow-auto">
        {JSON.stringify(wishlist, null, 2)}
      </pre>
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
          <ProductCard key={`card-${i}`} product={product} isAuthenticated={isAuthenticated} />
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
