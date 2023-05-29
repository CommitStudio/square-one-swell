import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo/ProductInfo';

interface ProductProp {
  product: Product;
  categories: Category[];
}

const ProductSection = ({ product, categories }: ProductProp) => (
  <div className="flex flex-col justify-center items-center">
    <div className="flex gap-12 flex-col my-10 md:flex-row">
      <ProductImageGallery product={product} />
      <ProductInfo product={product} categories={categories} />
    </div>
  </div>
);

export default ProductSection;
