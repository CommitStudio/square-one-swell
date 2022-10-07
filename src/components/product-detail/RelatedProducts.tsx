import ProductList from '../ProductList';
interface ProductProp {
  product: Product;
  products: Product[];
  title: string;
}

const RelatedProducts = ({ title, product, products }: ProductProp) => {
  const relatedProducts = products.filter((prod) => prod.id !== product.id);

  return (
    <>
      <div className="flex flex-col text-center py-4 mb-8">
        <p className="text-4xl py-4">{title}</p>
        <span className="w-[60px] h-[2.5px] bg-secondary mx-auto"></span>
      </div>
      <ProductList products={relatedProducts} />
    </>
  );
};

export default RelatedProducts;
