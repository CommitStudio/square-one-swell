import ProductCharacteristics from './ProductCharacteristics';

import AddToCart from '~/components/product-detail/ProductInfo/AddToCart';
import ProductCategories from '~/components/product-detail/ProductInfo/ProductCategories';
import ProductDescription from '~/components/product-detail/ProductInfo/ProductDescription';
import ProductPriceOptions from '~/components/product-detail/ProductInfo/ProductPriceOptions';
import ProductSocialMedia from '~/components/product-detail/ProductInfo/ProductSocialMedia';
import ProductTitle from '~/components/product-detail/ProductInfo/ProductTitle';

export interface Props {
  test_product: {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    colors?: string[];
    sizes?: string[];
    characteristics?: string[];
    categories?: string[];
  };
}

const ProductInfo = ({ test_product }: Props) => {
  return (
    <div className="w-full ml-0 md:ml-6 space-y-4 mt-5 md:mt-0">
      <ProductTitle title={test_product.title} />
      {/* TODO: add rating */}
      <ProductDescription description={test_product.description} />
      <ProductPriceOptions sizes={test_product.sizes} price={test_product.price} />
      <AddToCart />
      <ProductCharacteristics characteristics={test_product.characteristics} />
      <ProductCategories categories={test_product.categories} />
      <ProductSocialMedia />
    </div>
  );
};

export default ProductInfo;
