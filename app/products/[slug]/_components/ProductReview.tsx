import ProductRatings from './ProductReview/ProductRatings';

const ProductReview = () => {
  return (
    <div className="my-16 ">
      <div className="flex space-x-10 -mb-[1px] font-libre">
        <span className="border border-gray-medium py-1 px-3 flex items-center cursor-pointer rounded-tl rounded-tr border-b-white text-lg">
          Reviews
        </span>
      </div>
      <div className="border border-gray-medium rounded-bl rounded-br rounded-tr">
        <ProductRatings />
      </div>
    </div>
  );
};

export default ProductReview;
