import ProductSocialMedia from './ProductSocialMedia';

import AddToCart from '~/components/product-detail/ProductInfo/AddToCart';
import ProductDescription from '~/components/product-detail/ProductInfo/ProductDescription';
import ProductPriceOptions from '~/components/product-detail/ProductInfo/ProductPriceOptions';
import data from '~/data/product-detail.json';

const ProductInfo = () => {
  const { categories } = data;
  return (
    <div className="w-full ml-0 md:ml-6 space-y-4 mt-5 md:mt-0">
      <div className="text-2xl">Best Woolen T-Shirt</div>
      {/* TODO: add rating */}
      <ProductDescription />
      <ProductPriceOptions />
      <AddToCart />
      <ul className="space-y-2">
        <li>• 100% cotton</li>
        <li>• 6 months warranty</li>
        <li>• High quality</li>
      </ul>
      <div>
        <span>Categories:</span>
        {categories.map((category) => {
          return (
            <a className="ml-2 cursor-pointer" key={category}>
              {category},
            </a>
          );
        })}
      </div>
      <ProductSocialMedia />
    </div>
  );
};

export default ProductInfo;
