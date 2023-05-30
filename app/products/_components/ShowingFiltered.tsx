import Container from '~/_layouts/Container';

type Props = {
  products: Product[];
  query: FilterParams;
};

function keepLastWord(text: string) {
  return text.split('-').pop();
}

export function ShowingFiltered({ products, query }: Props) {
  const formatPriceRange = () => {
    const minPrice = query.minPrice?.toString();
    const maxPrice = query.maxPrice?.toString();

    if (minPrice && maxPrice) {
      return `$${minPrice} - $${maxPrice}`;
    } else if (minPrice && minPrice !== '0') {
      return `$${minPrice}+`;
    } else if (minPrice === '0' && !maxPrice) {
      return 'All Prices';
    }

    return '';
  };

  const category = query.category && keepLastWord(query.category.toString());
  const priceRange = formatPriceRange();

  return (
    <Container>
      <p className="inline-block font-quicksand text-xl mb-5 border-b text-black border-gray-medium">
        <span>
          Showing {products.length} filtered {products.length === 1 ? 'product' : 'products'} by{' '}
        </span>
        <span className="font-medium inline-block first-letter:uppercase">{category}</span>
        {query.minPrice && query.category && ` and `}
        <span className="font-medium">{priceRange}</span>
        <span className="font-medium inline-block first-letter:uppercase">
          {Object.keys(query).toString() === 'search' && Object.values(query)}
        </span>
      </p>
    </Container>
  );
}

export default ShowingFiltered;
