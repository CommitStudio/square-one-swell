import ProductRatings from '~/components/product-detail/ProductReview/ProductRatings';

export interface Props {
  test_product: {
    id?: number;
    title?: string;
    rating?: number;
    description?: string;
    price?: number;
    colors?: string[];
    sizes?: string[];
    characteristics?: string[];
    categories?: string[];
    additional_information: {
      Weight?: string;
      Dimensions?: string;
      Materials?: string;
      Size?: string;
    };
  };
}

const ProductReview = ({ test_product }: Props) => {
  return (
    <div className="my-16">
      <div className="flex space-x-10 -mb-[1px]">
        <span className="border border-secondary py-1 px-3 flex items-center cursor-pointer rounded-tl rounded-tr border-b-white text-2xl">
          Reviews
        </span>
      </div>
      <div className="border border-secondary rounded-bl rounded-br rounded-tr">
        <ProductRatings />
      </div>
    </div>
  );
};

export default ProductReview;
