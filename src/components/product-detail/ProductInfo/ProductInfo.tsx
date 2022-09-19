import AddToCart from '~/components/product-detail/ProductInfo/AddToCart';
import ProductCategories from '~/components/product-detail/ProductInfo/ProductCategories';
import ProductCharacteristics from '~/components/product-detail/ProductInfo/ProductCharacteristics';
import ProductColors from '~/components/product-detail/ProductInfo/ProductColors';
import ProductDescription from '~/components/product-detail/ProductInfo/ProductDescription';
import ProductPriceOptions from '~/components/product-detail/ProductInfo/ProductPriceOptions';
import ProductRating from '~/components/product-detail/ProductInfo/ProductRating';
import ProductSocialMedia from '~/components/product-detail/ProductInfo/ProductSocialMedia';
import ProductTitle from '~/components/product-detail/ProductInfo/ProductTitle';

interface ProductProp {
  product: [Product];
}

const ProductInfo = ({ product }: ProductProp) => {
  return (
    <div className="w-full ml-0 md:ml-6 space-y-4 mt-5 md:mt-0">
      <ProductTitle title={product[0].name} />
      <ProductRating rating={3} />
      <ProductDescription description={product[0].description} />
      <ProductPriceOptions
        sizes={['L', 'M', 'S', 'XL', 'XXL', 'Over Size']}
        price={product[0].price}
      />
      <ProductColors colors={['#FFFF00', '#FFFF', '#0000FF']} />
      <AddToCart />
      <ProductCharacteristics
        characteristics={['100% cotton', '6 months warranty', 'High quality']}
      />
      <ProductCategories categories={['Men', 'Women', 'Kids', 'Accessories']} />
      <ProductSocialMedia />
    </div>
  );
};

export default ProductInfo;
