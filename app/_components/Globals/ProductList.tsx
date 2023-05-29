import ProductCard from './ProductCard';

import Container from '~/_layouts/Container';

interface Props {
  relatedProducts?: boolean;
  threeColumns?: boolean;
  products?: Product[];
}

const ProductList = ({ relatedProducts, threeColumns, products }: Props) => (
  <Container className="mb-10">
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
        threeColumns
          ? 'lg:grid-cols-3'
          : relatedProducts
          ? 'lg:flex justify-center'
          : 'lg:grid-cols-4'
      }  gap-y-4 justify-items-center`}
    >
      {products?.map((product, i) => (
        <ProductCard product={product} key={`card-${i}`} />
      ))}
    </div>
  </Container>
);

export default ProductList;
