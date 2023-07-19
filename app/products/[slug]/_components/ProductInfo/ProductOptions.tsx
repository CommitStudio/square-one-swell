'use client';

import { useEffect, useState } from 'react';

import ProductStock from './ProductStock';

import { useProductState } from '~/_hooks/useStore';

interface ProductProp {
  product: Product;
}

interface Option {
  label: string;
  active: boolean;
  values: Array<{ name: string; id: string }>;
}

interface OptionState {
  currentOptionValue: { name: string; id: string } | null;
  currentOption: Option | null;
  selectedIds: Record<string, string>;
}

const ProductOptions = ({ product }: ProductProp) => {
  const { productState, updateProductState } = useProductState();
  const [optionState, setOptionState] = useState<OptionState>({
    currentOptionValue: null,
    currentOption: null,
    selectedIds: {}
  });

  function findMatchingObject(variants: Variant[], valueIdsObject: Record<string, string>) {
    for (let i = 0; i < variants.length; i++) {
      const item = variants[i];
      const valueIds = Object.values(item.value_ids);
      if (objectContainsAllValues(valueIds, valueIdsObject)) {
        return item;
      }
    }
    return null; // Return null if no matching object is found
  }

  function objectContainsAllValues(valuesArray: string[], valueIdsObject: Record<string, string>) {
    for (const key in valueIdsObject) {
      if (!valuesArray.includes(valueIdsObject[key])) {
        return false;
      }
    }
    return true;
  }

  // Find the first available (active) variant option and select it by default
  useEffect(() => {
    const firstActiveVariant = product.variants?.reverse().find((variant) => variant.active);
    const firstActiveLabel = firstActiveVariant?.name.split(', ');

    const initialOptions: Record<string, string> = {};

    product.options?.forEach((option, i) => {
      initialOptions[option.label] = firstActiveLabel ? firstActiveLabel[i] : '';
    });

    // Update selectedIds directly from the product prop
    const selectedIds: Record<string, string> = {};
    product.options?.forEach((option, i) => {
      if (option.active && firstActiveVariant) {
        const valueIds = firstActiveVariant.value_ids;
        if (typeof valueIds === 'object' && !Array.isArray(valueIds)) {
          selectedIds[option.label] = valueIds[i];
        }
      }
    });

    setOptionState((prevState) => ({
      ...prevState,
      selectedIds
    }));

    const variantSelectedbyOptionsId =
      product.variants && findMatchingObject(product.variants, selectedIds);

    updateProductState({
      ...productState,
      chosenOptions: initialOptions,
      chosenOptionsId: Object.values(selectedIds),
      chosenVariant: {
        variantLabel: variantSelectedbyOptionsId?.name,
        variantId: variantSelectedbyOptionsId?.id,
        variantActive: variantSelectedbyOptionsId?.active,
        variantStock: variantSelectedbyOptionsId?.stock_variant
      }
    });
  }, [product]);

  const handleClick = (value: { name: string; id: string }, option: Option) => {
    setOptionState((prevState) => ({
      ...prevState,
      selectedIds: {
        ...prevState.selectedIds,
        [option.label]: value?.id
      },
      currentOptionValue: value,
      currentOption: option
    }));
  };

  useEffect(() => {
    if (!optionState.currentOption || !optionState.currentOptionValue) return;

    const variantSelectedbyOptionsId =
      product.variants && findMatchingObject(product.variants, optionState.selectedIds);

    updateProductState({
      ...productState,
      chosenOptions: {
        ...productState.chosenOptions,
        [optionState.currentOption.label]: optionState.currentOptionValue.name
      },
      chosenOptionsId: Object.values({
        ...productState.chosenOptions,
        [optionState.currentOption.label]: optionState.currentOptionValue.name
      }),
      chosenVariant: {
        ...productState.chosenVariant,
        variantLabel: variantSelectedbyOptionsId?.name,
        variantId: variantSelectedbyOptionsId?.id,
        variantActive: variantSelectedbyOptionsId?.active,
        variantStock: variantSelectedbyOptionsId?.stock_variant
      }
    });
  }, [optionState.selectedIds]);

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
                  {option.values.map((value) => {
                    return (
                      <>
                        {option.label === 'Color' ? (
                          <li
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
