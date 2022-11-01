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
                        className={`border border-secondary px-2 cursor-pointer hover:bg-secondary hover:text-primary ${
                          availableIdsArr.includes(value.id) ? 'bg-secondary text-primary' : ''
                        }`}
                        key={index}
                        onClick={() => {
                          setChosenOptions({ ...chosenOptions, [option.label]: value.name });
                          setSelectedIds({ ...selectedIds, [option.label]: value.id });
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
