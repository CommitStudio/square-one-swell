import parse from 'html-react-parser';

type Description = {
  description?: string;
};

const ProductDescription = ({ description }: Description) => {
  return <>{description && <div className="font-light">{parse(description)}</div>}</>;
};

export default ProductDescription;
