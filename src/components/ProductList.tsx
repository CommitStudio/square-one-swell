import { v4 as uuidv4 } from 'uuid';

import ProductCard from '~/components/ProductCard';

import Container from '~/layouts/Container';

interface Props {
  relatedProductsAmount?: number;
  threeColumns?: boolean;
  products?: Product[];
}

const ProductList = ({ relatedProductsAmount, threeColumns, products }: Props) => {
  return (
    <Container className="mb-10">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
          threeColumns
            ? 'lg:grid-cols-3 max-w-4xl mx-auto'
            : relatedProductsAmount
            ? `lg:flex justify-center max-w-4xl mx-auto`
            : 'lg:grid-cols-4'
        }  gap-y-4 justify-items-center`}
      >
        {products?.map((product) => {
          return <ProductCard product={product} key={uuidv4()} />;
        })}
      </div>
    </Container>
  );
};

export default ProductList;
