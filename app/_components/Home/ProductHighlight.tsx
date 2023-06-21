import Button from '~/_components/Button';
import ProductList from '~/_components/Globals/ProductList';

type ProductHighlightProps = {
  products?: Product[];
  title: string;
  isAuthenticated: boolean;
};

const ProductHighlight = ({ products, title, isAuthenticated }: ProductHighlightProps) => {
  const randomProducts = products ? products.sort(() => Math.random() - 0.5).slice(0, 3) : [];

  return (
    <>
      <div className="flex flex-col text-center py-4 mb-4 font-libre">
        <h5 className="text-2xl py-4 uppercase">{title}</h5>
      </div>

      <ProductList threeColumns products={randomProducts} isAuthenticated={isAuthenticated} />

      <div className="w-full flex justify-center my-10">
        <Button
          label="SEE MORE"
          color="green"
          linkUrl={'/products?category=featured'}
          classes={`transition-all duration-300`}
        />
      </div>
    </>
  );
};

export default ProductHighlight;
