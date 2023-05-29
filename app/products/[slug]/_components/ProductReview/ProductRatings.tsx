import Rating from './Rating';
import WriteAReview from './WriteAReview';

const ProductRatings = () => {
  return (
    <div className="space-y-8 p-5 mx-auto w-full md:w-[1000px]">
      <Rating />
      <Rating />
      <Rating />
      <Rating />
      <WriteAReview />
    </div>
  );
};

export default ProductRatings;
