import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import Tooltip from 'app/_components/globals/Tooltip';

type Rating = {
  rating?: number;
};

const ProductRating = ({ rating }: Rating) => {
  return (
    <Tooltip content="Feature coming soon!">
      <div className="w-fit">
        <Rater total={5} rating={rating} />
      </div>
    </Tooltip>
  );
};

export default ProductRating;
