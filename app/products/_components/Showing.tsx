import Container from '~/_layouts/Container';

type Props = {
  pagination: Pagination;
  className?: string;
};

export default function Showing({ pagination, className }: Props) {
  const { limit, current, total } = pagination;

  if (total === 0) {
    return <p className={className} />;
  }

  const fromProduct = limit * (current - 1) + 1;
  const toProductRaw = limit * current;
  const toProduct = toProductRaw > total ? total : toProductRaw;

  return (
    <Container>
      <p className={className}>
        Showing {fromProduct} - {toProduct} of {total} Products
      </p>
    </Container>
  );
}
