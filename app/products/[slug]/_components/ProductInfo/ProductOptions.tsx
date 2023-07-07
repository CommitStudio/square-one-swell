'use client';

import { useEffect, useState } from 'react';

import ProductStock from './ProductStock';

import { useStore, useProductState } from '~/_hooks/useStore';

interface ProductProp {
  product: Product;
}

const ProductOptions = ({ product }: ProductProp) => {
  const [selectedIds, setSelectedIds] = useState({});
  const { state, updateState } = useStore();
  const { productState, updateProductProp } = useProductState();

  // Save only the variants with active states
  const activeProductVariants = product.variants?.filter((variant) => variant.active);

  // Transform the selected products, from object into an array, to compare them with the set of active ids.
  const availableProductsId = Object.entries(selectedIds).map(([, value]) => value);

  // Join the values to get the label for get the active variant.
  // It returns for example: "M, red" or "L, blue"
  function joinValues(obj: { [key: string]: string }) {
    const values = Object.values(obj);
    return values.join(', ');
  }

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

      setSelectedIds((prev) => ({ ...prev, [option.label]: firstActiveVariant?.value_ids[i] }));
    });

    updateProductProp('chosenOptions', initialOptions);
  }, [product]);

  // Declare useEffect to 'listen' for variant selections
  useEffect(() => {
    // When the options have an item clicked we ask if the selected ids are the same as in the active variant
    if (availableProductsId.length === product.options?.length) {
      // Returns true or false if the selected ids are the same in the active variant
      const selectedIdsameAsActiveVariants = activeProductVariants?.map((variant) => {
        return variant.value_ids.every((id) => {
          return availableProductsId?.includes(id);
        });
      });

      // Set global state accordingly if its active or not
      if (selectedIdsameAsActiveVariants?.includes(true)) {
        updateState({ ...state, isVariantActive: true });
      } else {
        updateState({ ...state, isVariantActive: false });
      }
    }

    // Get the label of the selected options to look for the variant. It returns for example, "M, red" or "L, blue"
    const variantLabelSelected = joinValues(productState.chosenOptions);
    // Look for the selected variant, with the variantLabelSelected
    const variantSelected: Variant | undefined = product.variants?.find((variant) =>
      variant.name.includes(variantLabelSelected)
    );
    // Update de chosenVariant under the productState with the values that we need
    updateProductProp('chosenVariant', {
      ...productState.chosenVariant,
      variantLabel: variantSelected?.name,
      variantId: variantSelected?.id,
      variantActive: variantSelected?.active,
      variantStock: variantSelected?.stock_variant
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                              availableProductsId.includes(value.id)
                                ? 'border-green opacity-95'
                                : ''
                            }`}
                            style={{ backgroundColor: `${value.name}` }}
                            onClick={() => {
                              updateProductProp('chosenOptions', {
                                ...productState.chosenOptions,
                                [option.label]: value.name
                              });
                              setSelectedIds({ ...selectedIds, [option.label]: value.id }); // ex {Color: 'red'}
                            }}
                          ></li>
                        ) : (
                          <li
                            className={`border border-black px-2 py-1 cursor-pointer text-xs hover:bg-black hover:text-white ${
                              availableProductsId.includes(value.id) ? 'bg-black text-white' : ''
                            }`}
                            key={'color' + index.toString()}
                            onClick={() => {
                              updateProductProp('chosenOptions', {
                                ...productState.chosenOptions,
                                [option.label]: value.name
                              });
                              setSelectedIds({ ...selectedIds, [option.label]: value.id }); // ex {Size: 'L'}
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
