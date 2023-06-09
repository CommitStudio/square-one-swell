import { toggleWishlistAction, getWishlistIdsAction } from '../../_actions/wishlist';

import AddToCart from './AddToCart';
import ProductDescription from './ProductDescription';
import ProductOptions from './ProductOptions';
import ProductPriceOptions from './ProductPriceOptions';
import ProductRating from './ProductRating';
import ProductSocialMedia from './ProductSocialMedia';
import ProductTitle from './ProductTitle';

interface ProductProp {
  product: Product;
  categories: Category[];
}

const ProductInfo = ({ product }: ProductProp) => {
  return (
    <div className="w-full space-y-2 mt-5 md:mt-0">
      <ProductTitle title={product.name} />
      <ProductRating rating={3} />
      <ProductPriceOptions price={product.price} salePrice={product.salePrice} />
      <ProductOptions product={product} />
      <AddToCart
        product={product}
        toggleWishlistAction={toggleWishlistAction}
        getWishlistIdsAction={getWishlistIdsAction}
      />
      <ProductDescription description={product.description} />
      <ProductSocialMedia />
    </div>
  );
};

export default ProductInfo;
