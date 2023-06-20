import ProductList from '~/_components/Globals/ProductList';

interface ProductProp {
  product: Product;
  products: Product[];
  title: string;
}

const RelatedProducts = ({ title, product, products }: ProductProp) => {
  const relatedProducts = products.filter((prod) => prod.id !== product.id); // Remove the current product from the list of related products

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col text-center mt-12 mb-4">
        <p className="text-3xl py-4 font-libre">{title}</p>
      </div>
      <ProductList relatedProducts={true} products={relatedProducts} />
    </>
  );
};

export default RelatedProducts;
