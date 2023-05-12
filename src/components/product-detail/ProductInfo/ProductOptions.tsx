import { useEffect, useState } from 'react';

import { useStore } from '~/hooks/useStore';

interface ProductProp {
  product: Product;
  chosenOptions: { [key: string]: string };
  setChosenOptions: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const ProductOptions = ({ product, setChosenOptions, chosenOptions }: ProductProp) => {
  const [selectedIds, setSelectedIds] = useState({});
  const { state, updateState } = useStore();

  // Save only the variants with active states
  const activeProductVariants = product.variants?.filter((variant) => variant.active);

  // Transform the selected products, from object into an array, to compare them with the set of active ids.
  const availableProductsId = Object.entries(selectedIds).map(([key, value]) => value);

  // Find the first available (active) variant option and select it by default
  useEffect(() => {
    const firstActiveVariant = product.variants?.reverse().find((variant) => variant.active);
    const firstActiveLabel = firstActiveVariant?.name.split(', ');
    product.options?.map((option, i, key) => {
      setChosenOptions((prev) => ({
        ...prev,
        [option.label]: firstActiveLabel ? firstActiveLabel[i] : ''
      }));
      setSelectedIds((prev) => ({ ...prev, [option.label]: firstActiveVariant?.value_ids[i] }));
    });
  }, [product, setChosenOptions]);

  // Declare useEffect to 'listen' for variant selections
  useEffect(() => {
    // When the options have an item clicked we ask if the selected ids are the same as in the active variant
    if (availableProductsId.length === product.options?.length) {
      // Returns true or false if the selected ids are the same in the active variant
      const selectedIdsameAsActiveVariants = activeProductVariants?.map((variant, key) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  return (
    <div className="space-y-3">
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
                              setChosenOptions({ ...chosenOptions, [option.label]: value.name });
                              setSelectedIds({ ...selectedIds, [option.label]: value.id });
                            }}
                          ></li>
                        ) : (
                          <li
                            className={`border border-black px-2 py-1 cursor-pointer text-xs hover:bg-black hover:text-white ${
                              availableProductsId.includes(value.id) ? 'bg-black text-white' : ''
                            }`}
                            key={'color' + index.toString()}
                            onClick={() => {
                              setChosenOptions({ ...chosenOptions, [option.label]: value.name });
                              setSelectedIds({ ...selectedIds, [option.label]: value.id });
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
