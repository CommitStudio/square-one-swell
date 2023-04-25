import ProductList from '../ProductList';
interface ProductProp {
  product: Product;
  products: Product[];
  title: string;
}

const RelatedProducts = ({ title, product, products }: ProductProp) => {
  const relatedProducts = products.filter((prod) => prod.id !== product.id);

  return relatedProducts.length > 0 ? (
    <>
      <div className="flex flex-col text-center mt-12 mb-16">
        <p className="text-3xl py-4 font-libre">{title}</p>
      </div>
      <ProductList relatedProducts={true} products={relatedProducts} />
    </>
  ) : null;
};

export default RelatedProducts;
