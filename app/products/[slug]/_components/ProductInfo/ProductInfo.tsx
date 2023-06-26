import AddToCart from './AddToCart';
import ProductDescription from './ProductDescription';
import ProductOptions from './ProductOptions';
import ProductPriceOptions from './ProductPriceOptions';
import ProductRating from './ProductRating';
import ProductSocialMedia from './ProductSocialMedia';
import ProductStock from './ProductStock';
import ProductTitle from './ProductTitle';

import { isAuthenticated } from '~/_lib/SwellAPI';

interface ProductProp {
  product: Product;
  categories: Category[];
}

const ProductInfo = async ({ product }: ProductProp) => {
  const auth = await isAuthenticated();

  return (
    <div className="w-full space-y-2 mt-5 md:mt-0">
      <ProductTitle title={product.name} />
      <ProductStock stock={product.stock} />
      <ProductRating rating={3} />
      <ProductPriceOptions price={product.price} salePrice={product.salePrice} />
      <ProductOptions product={product} />
      <AddToCart product={product} isAuthenticated={auth} />
      <ProductDescription description={product.description} />
      <ProductSocialMedia />
    </div>
  );
};

export default ProductInfo;
