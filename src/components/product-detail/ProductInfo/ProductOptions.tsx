interface ProductProp {
  product: Product;
}

const ProductOptions = ({ product }: ProductProp) => {
  return (
    <>
      {product.options?.map((option, i) => {
        return (
          <div key={i} className="flex items-center">
            {option.active && (
              <>
                <h5 className="pr-3">{option.label}:</h5>
                <ul className="flex gap-x-5">
                  {option.values.map((value, i) => {
                    return (
                      <li
                        className="border border-secondary px-2 cursor-pointer hover:bg-secondary hover:text-primary"
                        key={i}
                      >
                        {value}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ProductOptions;
