import parse from 'html-react-parser';

type Description = {
  description?: string;
};

const ProductDescription = ({ description }: Description) => {
  return (
    <>
      {description && (
        <div className="font-quicksand">
          <p>Description:</p>
          <p>{parse(description)}</p>
        </div>
      )}
    </>
  );
};

export default ProductDescription;
