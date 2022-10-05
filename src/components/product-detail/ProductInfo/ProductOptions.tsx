import { useState } from 'react';

interface ProductProp {
  product: Product;
}

const ProductOptions = ({ product }: ProductProp) => {
  const activeVariants = [];

  const checkAvailability = (option, id, index) => {
    console.log(option);

    product.variants?.map((value) => {
      const test = new Map([[option.label, 'hola']]);
      console.log('test', test);

      // if (
      //   value.value_ids.find((variant_id) => {
      //     return id === variant_id;
      //   }) &&
      //   value.active
      // ) {
      //   activeVariants.push(id);
      // }
    });
  };

  // console.log(activeVariants);

  // console.log(product.name, product.variants, product.variants[0].value_ids);

  // console.log('==================');
  // console.log(product.options[0]);
  // console.log('==================');

  return (
    <>
      {product.options?.map((option, i) => {
        return (
          <div key={i} className="flex items-center">
            {option.active && (
              <>
                <h5 className="pr-3">{option.label}:</h5>
                <ul className="flex gap-x-5">
                  {option.values.map((value, index) => {
                    return (
                      <li
                        className="border border-secondary px-2 cursor-pointer hover:bg-secondary hover:text-primary"
                        key={index}
                        onClick={() => checkAvailability(option, value, index)}
                      >
                        {value.name}
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
