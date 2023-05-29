type TitleProps = {
  title?: string;
  id?: string;
};

const ProductTitle = ({ title }: TitleProps) => (
  <h5 className="text-xl font-quicksand uppercase">{title}</h5>
);

export default ProductTitle;
