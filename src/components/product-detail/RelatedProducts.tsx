import ProductList from '../ProductList';
interface ProductProp {
  product: Product;
  products: Product[];
  title: string;
}

const RelatedProducts = ({ title, product, products }: ProductProp) => {
  const relatedProducts = products.filter((prod) => prod.id !== product.id);

  return relatedProducts.length > 0 ? (
    <div className="mb-20">
      <div className="flex flex-col text-center mb-8">
        <p className="text-4xl py-4">{title}</p>
        <span className="w-[60px] h-[2.5px] bg-secondary mx-auto"></span>
      </div>
      <ProductList relatedProductsAmount={relatedProducts.length} products={relatedProducts} />
    </div>
  ) : null;
};

export default RelatedProducts;
