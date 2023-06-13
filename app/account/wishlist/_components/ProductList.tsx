'use client';

import ProductCard from '~/_components/Globals/ProductCard';

interface Props {
  isAuthenticated: boolean;
  toggleWishlistAction: (productId: string) => Promise<Product[]>;
  wishlist: Product[];
}

const ProductList = ({ isAuthenticated, toggleWishlistAction, wishlist }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {wishlist?.map((product, i) => {
        return (
          <ProductCard
            product={product}
            toggleWishlistAction={toggleWishlistAction}
            isAuthenticated={isAuthenticated}
            inWishlist={true}
            key={`card-${i}`}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
