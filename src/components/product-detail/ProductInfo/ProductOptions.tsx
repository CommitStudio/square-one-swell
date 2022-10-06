import { useState } from 'react';

import { variants } from 'tailwind.config';

interface ProductProp {
  product: Product;
}

const ProductOptions = ({ product }: ProductProp) => {
  const [checkingOptions, setCheckingOptions] = useState({});
  console.log(product.variants, 'TOTAL PRODUCT VARIANTS');
  console.log('*************************************************');
  console.log('*************************************************');
  console.log(product.options, 'TOTAL PRODUCT OPTIONS');
  let activeVariants = [];
  let filteringParams = {};

  const checkAvailability = (value, option) => {
    console.log(option);
    activeVariants = [];

    filteringParams = { ...filteringParams, [option.label]: value.id };
    const filterinParamsArrayOfIds = Object.values(filteringParams);

    product.variants.forEach((variant) => {
      const multipleExist = filterinParamsArrayOfIds.every((value) => {
        return variant?.value_ids?.includes(value);
      });
      multipleExist && variant.active ? console.log(variant) : '';
    });

    console.log(
      filterinParamsArrayOfIds.map((id) => {
        return product.variants.map((variant) => {
          if (
            variant.value_ids.every((optionId) => {
              return optionId == id;
            })
          ) {
            return variant;
          }
        });
      })
    );

    // product.variants?.map((variant) => {
    //   if (
    //     variant.value_ids.find((optionId) => {
    //       return optionId == value.id;
    //     }) &&
    //     variant.active
    //   ) {
    //     activeVariants.push(variant);
    //   }
    // });

    console.log(filterinParamsArrayOfIds);
    console.log(activeVariants);
    console.log(checkingOptions, 'CHECKING OPTIONS');
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
                        onClick={() => {
                          checkAvailability(value, option);
                        }}
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
