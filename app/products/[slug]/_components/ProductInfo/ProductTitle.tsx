type TitleProps = {
  title?: string;
  id?: string;
};

const ProductTitle = ({ title }: TitleProps) => (
  <h5 data-cy="product-title" className="text-xl font-quicksand uppercase">
    {title}
  </h5>
);

export default ProductTitle;
