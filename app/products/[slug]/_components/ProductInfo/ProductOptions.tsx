'use client';

import { useEffect, useState } from 'react';

import ProductStock from './ProductStock';

import { useProductState } from '~/_hooks/useStore';

interface ProductProp {
  product: Product;
}

const ProductOptions = ({ product }: ProductProp) => {
  const { productState, updateProductState } = useProductState();
  const [currentOptionValue, setCurrentOptionValue] = useState();
  const [currentOption, setCurrentOption] = useState();
  const [selectedIds, setSelectedIds] = useState();
  // cambiar a un useState

  function findMatchingObject(variants, valueIdsObject) {
    for (let i = 0; i < variants.length; i++) {
      const item = variants[i];
      const valueIds = Object.values(item.value_ids);
      if (objectContainsAllValues(valueIds, valueIdsObject)) {
        return item;
      }
    }
    return null; // Return null if no matching object is found
  }

  function objectContainsAllValues(valuesArray, valueIdsObject) {
    for (const key in valueIdsObject) {
      if (!valuesArray.includes(valueIdsObject[key])) {
        return false;
      }
    }
    return true;
  }

  let selectIds = {};

  // Find the first available (active) variant option and select it by default
  useEffect(() => {
    const firstActiveVariant = product.variants?.reverse().find((variant) => variant.active);
    const firstActiveLabel = firstActiveVariant?.name.split(', ');

    let initialOptions = {};

    product.options?.map((option, i) => {
      initialOptions = {
        ...initialOptions,
        [option.label]: firstActiveLabel ? firstActiveLabel[i] : ''
      };

      selectIds = { ...selectIds, [option.label]: firstActiveVariant?.value_ids[i] };
      setSelectedIds({ ...selectIds, [option.label]: firstActiveVariant?.value_ids[i] });
    });

    const variantSelectedbyOptionsId =
      product.variants && findMatchingObject(product.variants, Object.values(selectIds));

    updateProductState({
      ...productState,
      chosenOptions: initialOptions,
      chosenOptionsId: Object.values(selectIds),
      chosenVariant: {
        variantLabel: variantSelectedbyOptionsId?.name,
        variantId: variantSelectedbyOptionsId?.id,
        variantActive: variantSelectedbyOptionsId?.active,
        variantStock: variantSelectedbyOptionsId?.stock_variant
      }
    });
  }, [product]);

  const handleClick = (value, option) => {
    setSelectedIds((prev) => ({ ...prev, [option.label]: value?.id }));
    setCurrentOptionValue(value);
    setCurrentOption(option);
  };

  useEffect(() => {
    if (!currentOption) return;
    if (!currentOptionValue) return;

    selectIds = { ...selectedIds, [currentOption.label]: currentOptionValue?.id };
    const variantSelectedbyOptionsId =
      product.variants && findMatchingObject(product.variants, Object.values(selectIds));

    updateProductState({
      ...productState,
      chosenOptions: {
        ...productState.chosenOptions,
        [currentOption.label]: currentOptionValue.name
      },
      chosenOptionsId: Object.values({
        ...productState.chosenOptions,
        [currentOption.label]: currentOptionValue.name
      }),
      chosenVariant: {
        ...productState.chosenVariant,
        variantLabel: variantSelectedbyOptionsId?.name,
        variantId: variantSelectedbyOptionsId?.id,
        variantActive: variantSelectedbyOptionsId?.active,
        variantStock: variantSelectedbyOptionsId?.stock_variant
      }
    });
  }, [selectedIds]);

  return (
    <div className="space-y-3">
      {productState.chosenVariant.variantActive && (
        <ProductStock stock={productState.chosenVariant.variantStock} />
      )}
      {product.options?.map((option, index) => {
        return (
          <div key={'option' + index.toString()} className="space-y-1">
            {option.active && (
              <>
                <p className="pr-3 font-quicksand">{option.label}:</p>
                <ul className="flex gap-x-3 font-quicksand">
                  {option.values.map((value, index) => {
                    return (
                      <>
                        {option.label === 'Color' ? (
                          <li
                            key={'color' + index.toString()}
                            className={`border w-5 h-5 cursor-pointer opacity-50 ${
                              productState.chosenOptions[option.label] === value.name
                                ? 'border-green opacity-95'
                                : ''
                            }`}
                            style={{ backgroundColor: `${value.name}` }}
                            onClick={() => handleClick(value, option)}
                          ></li>
                        ) : (
                          <li
                            className={`border border-black px-2 py-1 cursor-pointer text-xs hover:bg-black hover:text-white ${
                              productState.chosenOptions[option.label] === value.name
                                ? 'bg-black text-white'
                                : ''
                            }`}
                            key={'color' + index.toString()}
                            onClick={() => {
                              handleClick(value, option);
                            }}
                          >
                            {value.name}
                          </li>
                        )}
                      </>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductOptions;
