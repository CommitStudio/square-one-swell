import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import 'react-toastify/dist/ReactToastify.css';

import { Spinner } from '~/components/globals/Spinner';
import Tooltip from '~/components/globals/Tooltip';
import { useStore, useGlobalState } from '~/hooks/useStore';
import swell from '~/lib/SwellJS';
import { notifyFailure, notifySuccess } from '~/utils/toastifies';

interface ProductProp {
  product: Product;
  chosenOptions: { [key: string]: string };
}

interface AddProductProps {
  product: Product;
  quantity: number;
  toastifyMessage: string;
}

const AddToCart = ({ product, chosenOptions }: ProductProp) => {
  const [productAmount, setProductAmount] = useState(1);
  const [areAllOptionsSelected, setAreAllOptionsSelected] = useState(false);
  const [pleaseSelectAllOptions, setPleaseSelectAllOptions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useStore();
  const { setCart } = useGlobalState();

  useEffect(() => {
    product.options?.length === Object.keys(chosenOptions).length && setAreAllOptionsSelected(true);
    product.options?.length === Object.keys(chosenOptions).length && setPleaseSelectAllOptions('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(chosenOptions).length]);

  const handleAddToCart = () => {
    if (!areAllOptionsSelected) {
      setPleaseSelectAllOptions('Please select the wanted options.');
    } else if (state.isVariantActive) {
      void addProduct({
        product: product,
        quantity: productAmount,
        toastifyMessage: `${productAmount} x ${product.name} has been successfully added to your cart.
        `
      });
    }
  };
  const addProduct = async ({ product, quantity, toastifyMessage }: AddProductProps) => {
    // Message of added product
    notifySuccess(toastifyMessage);

    //Turn on spinner while waiting
    setIsLoading(true);

    // Add product to cart on Swell
    await swell.cart
      .addItem({
        product_id: product.id,
        quantity: quantity,
        options: Object.keys(chosenOptions).map((optionName) => ({
          name: optionName,
          value: chosenOptions[optionName]
        }))
      })
      .then((cart) => {
        // Add product to cart
        setCart(cart);
      })
      .catch((err) => {
        console.log(err);
        // Message of error in case product is not added to cart on Swell
        notifyFailure(
          "There has been a problem, we couldn't add the product to your cart. We're sorry."
        );
      })
      .finally(() => {
        //Turn of spinner
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 py-5">
        <div className="flex">
          <input
            type="number"
            name="product-quantity"
            value={productAmount}
            id="product-quantity"
            className="focus-visible:outline-none text-sm font-quicksand w-10 text-center border border-gray border-r-0 appearance-none"
            onChange={(e) => setProductAmount(Number(e.target.value))}
          />
          <div className="flex flex-col">
            <button
              className="bg-gray hover:bg-gray-medium border border-gray border-b-0 hover:border-gray-300 p-1"
              onClick={() => setProductAmount(productAmount + 1)}
            >
              <IoIosArrowUp />
            </button>
            <button
              onClick={() => productAmount > 1 && setProductAmount(productAmount - 1)}
              className="bg-gray hover:bg-gray-medium border border-t-0 border-gray hover:border-gray-300 p-1"
            >
              <IoIosArrowDown />
            </button>
          </div>
        </div>
        <span className="flex items-center gap-2">
          <button
            onClick={() => handleAddToCart()}
            disabled={!state.isVariantActive || isLoading}
            className={`font-bold py-3 px-5 md:min-w-[240px]
         ${
           state.isVariantActive || product.options?.length === 0
             ? 'bg-black hover:bg-white font-quicksand border text-white hover:text-black duration-200'
             : 'bg-gray-medium text-white font-quicksand border border-gray-medium'
         }`}
          >
            {(state.isVariantActive || product.options?.length === 0) && !isLoading ? (
              'ADD TO CART'
            ) : isLoading ? (
              <Spinner size={6} />
            ) : (
              'UNAVAILABLE'
            )}
          </button>
          <Tooltip content="Feature coming soon!">
            <button className="py-3 hover:text-secondary hover:border-secondary duration-200">
              <AiOutlineHeart className="h-6 w-6" />
            </button>
          </Tooltip>
        </span>
      </div>
      {pleaseSelectAllOptions && (
        <p className="text-red-500 font-quicksand">{pleaseSelectAllOptions}</p>
      )}
    </>
  );
};

export default AddToCart;
