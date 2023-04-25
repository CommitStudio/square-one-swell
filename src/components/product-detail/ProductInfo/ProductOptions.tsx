import { useEffect, useState } from 'react';

import { useStore } from '~/hooks/useStore';

interface ProductProp {
  product: Product;
  chosenOptions: { [key: string]: string };
  setChosenOptions: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const ProductOptions = ({ product, setChosenOptions, chosenOptions }: ProductProp) => {
  // Declare useStates
  const [selectedIds, setSelectedIds] = useState({});
  const { state, updateState } = useStore();

  // Save only the variants with active states
  const activeProductVariants = product.variants?.filter((variant) => variant.active);
  // To compare selected ids with the sets of active ids we transform the object of selected into an array
  const availableIdsArr = Object.entries(selectedIds).map(([key, value]) => value);
  // Selects first avaiable variant option by default
  useEffect(() => {
    //find the first variant that is === active
    const firstActiveVariant = product.variants?.reverse().find((variant) => variant.active);
    const firstActiveLabel = firstActiveVariant?.name.split(', ');

    product.options?.map((option, i) => {
      setChosenOptions((prev) => ({
        ...prev,
        [option.label]: firstActiveLabel ? firstActiveLabel[i] : ''
      }));
      setSelectedIds((prev) => ({ ...prev, [option.label]: firstActiveVariant?.value_ids[i] }));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // Declare useEffect to 'listen' for variant selections
  useEffect(() => {
    // When the all options have a item clicked we ask if the selected ids are the same in the active variant
    if (availableIdsArr.length === product.options?.length) {
      // Declare a variable to save the value of the comparison
      const arrMap = activeProductVariants?.map((variant) => {
        return variant.value_ids.every((id) => {
          return availableIdsArr?.includes(id);
        });
      });
      // Set global state accordingly if its active or not
      if (arrMap?.includes(true)) {
        updateState({ ...state, isVariantActive: true });
      } else {
        updateState({ ...state, isVariantActive: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  return (
    <div className="space-y-3">
      {product.options?.map((option, i) => {
        return (
          <div key={i} className="space-y-1">
            {option.active && (
              <>
                <p className="pr-3 font-quicksand">{option.label}:</p>
                <ul className="flex gap-x-3 font-quicksand">
                  {option.values.map((value, index) => {
                    return (
                      <>
                        {option.label === 'Color' ? (
                          <li
                            className={`border w-5 h-5 cursor-pointer opacity-50 ${
                              availableIdsArr.includes(value.id) ? 'border-green opacity-95' : ''
                            }`}
                            style={{ backgroundColor: `${value.name}` }}
                            key={index}
                            onClick={() => {
                              setChosenOptions({ ...chosenOptions, [option.label]: value.name });
                              setSelectedIds({ ...selectedIds, [option.label]: value.id });
                            }}
                          ></li>
                        ) : (
                          <li
                            className={`border border-black px-2 py-1 cursor-pointer text-xs hover:bg-black hover:text-white ${
                              availableIdsArr.includes(value.id) ? 'bg-black text-white' : ''
                            }`}
                            key={index}
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
