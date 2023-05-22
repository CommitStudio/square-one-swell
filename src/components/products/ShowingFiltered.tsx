import { useRouter } from 'next/router';

import Container from '~/layouts/Container';

type Props = {
  products: Product[];
};

function keepLastWord(text: string) {
  return text.split('-').pop();
}

export function ShowingFiltered({ products }: Props) {
  const { query } = useRouter();
  console.log(query);
  return (
    <Container>
      <p className="inline-block font-quicksand text-xl mb-5 border-b text-black border-gray-medium">
        <span>
          Showing {products.length} filtered
          {products?.length > 1 ? ' products' : ' product'} by{' '}
        </span>
        <span className="font-medium inline-block first-letter:uppercase">
          {query.category && keepLastWord(query.category.toString())}
        </span>

        {query.minPrice && query.category && ` and `}
        <span className="font-medium">
          {query.maxPrice &&
            query.minPrice &&
            `$${query.minPrice.toString()} - $${query.maxPrice.toString()}`}

          {query.minPrice &&
            query.minPrice !== '0' &&
            query.maxPrice === '' &&
            `$${query?.minPrice.toString()}+`}
          {query.minPrice == '0' && query.maxPrice === '' && ' All Prices'}
        </span>
      </p>
    </Container>
  );
}

export default ShowingFiltered;
