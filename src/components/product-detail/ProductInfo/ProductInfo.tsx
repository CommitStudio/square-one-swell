import AddToCart from '~/components/product-detail/ProductInfo/AddToCart';
import ProductCategories from '~/components/product-detail/ProductInfo/ProductCategories';
import ProductCharacteristics from '~/components/product-detail/ProductInfo/ProductCharacteristics';
import ProductDescription from '~/components/product-detail/ProductInfo/ProductDescription';
import ProductOptions from '~/components/product-detail/ProductInfo/ProductOptions';
import ProductPriceOptions from '~/components/product-detail/ProductInfo/ProductPriceOptions';
import ProductRating from '~/components/product-detail/ProductInfo/ProductRating';
import ProductSocialMedia from '~/components/product-detail/ProductInfo/ProductSocialMedia';
import ProductTitle from '~/components/product-detail/ProductInfo/ProductTitle';

interface ProductProp {
  product: Product;
  categories: Category[];
}

const ProductInfo = ({ product, categories }: ProductProp) => {
  return (
    <div className="w-full ml-0 md:ml-6 space-y-4 mt-5 md:mt-0">
      <ProductTitle title={product.name} />
      <ProductRating rating={3} />
      <ProductDescription description={product.description} />
      <ProductPriceOptions price={product.price} />
      <ProductOptions product={product} />
      <AddToCart />
      <ProductCharacteristics
        characteristics={['100% cotton', '6 months warranty', 'High quality']}
      />
      <ProductCategories product={product} categories={categories} />
      <ProductSocialMedia />
    </div>
  );
};

export default ProductInfo;
