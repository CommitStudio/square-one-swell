import Link from 'next/link';

interface ProductProp {
  product: Product;
  categories: Category[];
}

const ProductCategories = ({ product, categories }: ProductProp) => {
  const productCategories = product.categories?.map((categoryId) => {
    return categories.find((category) => {
      return category.id == categoryId;
    });
  });

  return (
    <div className="flex flex-wrap gap-y-2 items-center">
      <span>Categories:</span>
      {productCategories?.map((category, i) => {
        return (
          <Link
            key={`product-category-${i}`}
            href={`/products?category=${category?.slug?.category as string}`}
            className="border border-gray-dark px-2 mx-2.5 cursor-pointer hover:bg-black hover:text-green"
          >
            {category?.name}
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCategories;
