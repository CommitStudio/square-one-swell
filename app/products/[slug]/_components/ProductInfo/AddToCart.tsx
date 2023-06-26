'use client';

import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import 'react-toastify/dist/ReactToastify.css';

import Button from '~/_components/Button';

import { Spinner } from '~/_components/Globals/Spinner';

import { useStore, useProductState, useGlobalState } from '~/_hooks/useStore';
import swell from '~/_lib/SwellJS';
import { notifyFailure, notifySuccess } from '~/_utils/toastifies';

import Wishlist from '~/products/_components/Wishlist';

interface ProductProp {
  product: Product;
  isAuthenticated: boolean;
}

interface AddProductProps {
  product: Product;
  quantity: number;
  toastifyMessage: string;
}

const AddToCart = ({ product, isAuthenticated }: ProductProp) => {
  const [productAmount, setProductAmount] = useState(1);
  const [pleaseSelectAllOptions, setPleaseSelectAllOptions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useStore();
  const { productState } = useProductState();
  const { setCart } = useGlobalState();

  const { chosenOptions } = productState;

  useEffect(() => {
    product.options?.length === Object.keys(chosenOptions).length;
    product.options?.length === Object.keys(chosenOptions).length && setPleaseSelectAllOptions('');
  }, [chosenOptions, product.options?.length]);

  const addProduct = async ({ product, quantity, toastifyMessage }: AddProductProps) => {
    // Turn on spinner while waiting
    setIsSubmitting(true);

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
        // Message of added product successfully to cart
        notifySuccess(toastifyMessage);
      })
      .catch((err) => {
        console.log(err);
        // Message of error in case product is not added to cart
        notifyFailure(
          "There has been a problem, we couldn't add the product to your cart. We're sorry."
        );
      })
      .finally(() => {
        // Turn off spinner
        setIsSubmitting(false);
      });
  };

  const handleAddToCart = () => {
    !isSubmitting &&
      void addProduct({
        product: product,
        quantity: productAmount,
        toastifyMessage: `${productAmount} x ${product.name} has been successfully added to your cart.`
      });
  };

  const buttonLabel = () => {
    if (product.stock === 0) {
      return 'COMING SOON!';
    }
    if (isSubmitting) {
      return <Spinner size={6} />;
    }
    if (state.isVariantActive || product.options?.length === 0) {
      return 'ADD TO CART';
    }
    return 'UNAVAILABLE';
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
          <Button
            onClick={() => handleAddToCart()}
            label={buttonLabel()}
            variant="fill"
            className={`font-bold py-3 px-5 md:min-w-[240px] ${
              state.isVariantActive || (product.options?.length === 0 && product.stock !== 0)
                ? 'bg-black font-quicksand border text-white duration-200 cursor-pointer hover:bg-white hover:text-black'
                : 'bg-gray-medium text-white font-quicksand border border-gray-medium'
            }`}
          />
          <Wishlist isAuthenticated={isAuthenticated} productId={product.id} />
        </span>
      </div>
      {pleaseSelectAllOptions && (
        <p className="text-red-500 font-quicksand">{pleaseSelectAllOptions}</p>
      )}
    </>
  );
};

export default AddToCart;
