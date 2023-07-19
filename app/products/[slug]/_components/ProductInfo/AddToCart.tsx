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
  const [isDisabled, setIsDisabled] = useState(false);

  const { state } = useStore();
  const { productState } = useProductState();
  const { cart, setCart } = useGlobalState();

  const { chosenOptions, chosenVariant } = productState;

  const selectedStock =
    // if there is variant information, we use the variant stock, otherwise we use the general product stock
    product.variants && product.variants?.length > 0 ? chosenVariant?.variantStock : product.stock;

  const productHasVariant = product.variants && product.variants?.length > 0;

  useEffect(() => {
    product.options?.length === Object.keys(chosenOptions).length;
    product.options?.length === Object.keys(chosenOptions).length && setPleaseSelectAllOptions('');

    setProductAmount(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenOptions, product.options?.length]);

  useEffect(() => {
    setIsDisabled(productAmount === selectedStock);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, productAmount, setProductAmount]);

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
    // to check if the product (with no variant) is in the cart
    const productInCart = cart && cart?.items?.find((item) => item.product_id.includes(product.id));

    // to check if the variant is in the cart
    const variantInCart =
      cart &&
      cart?.items?.find((item) =>
        item.variant_id?.includes(chosenVariant.variantId ? chosenVariant.variantId : '')
      );

    // to check the stock of the product in the cart
    if (productInCart && product.stock && productInCart?.quantity + productAmount > product.stock) {
      return notifyFailure("The amount selected exceeds the stock available. We're sorry.");
    }

    const variantStock = chosenVariant.variantStock ?? 0;

    if (variantInCart && variantInCart?.quantity + productAmount > variantStock) {
      return notifyFailure("The amount selected exceeds the stock available. We're sorry.");
    }

    !isSubmitting &&
      void addProduct({
        product: product,
        quantity: productAmount,
        toastifyMessage: `${productAmount} x ${product.name} has been successfully added to your cart.`
      });
  };

  const buttonLabel = () => {
    if (product.stock === 0) {
      return 'OUT OF STOCK';
    }
    if (isSubmitting) {
      return <Spinner size={6} />;
    }
    if (state.isVariantActive || product.options?.length === 0) {
      return 'ADD TO CART';
    }
    return 'UNAVAILABLE';
  };

  const handleProductAmount = () => {
    if (selectedStock) {
      if (productAmount < selectedStock) {
        setProductAmount(productAmount + 1);
      }
      // if there is no stock information, there is no limit
    } else setProductAmount(productAmount + 1);
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
              className={`bg-gray hover:bg-gray-medium border border-gray border-b-0 hover:border-gray-300 p-1 ${
                isDisabled ||
                product.stock === 0 ||
                (productHasVariant && !state.isVariantActive) ||
                isSubmitting
                  ? 'opacity-50 hover:bg-gray hover:border-gray-300'
                  : ''
              }`}
              disabled={
                isDisabled ||
                product.stock === 0 ||
                (productHasVariant && !state.isVariantActive) ||
                isSubmitting
              }
              onClick={() => handleProductAmount()}
            >
              <IoIosArrowUp />
            </button>
            <button
              onClick={() => productAmount > 1 && setProductAmount(productAmount - 1)}
              disabled={productHasVariant && !state.isVariantActive}
              className={`bg-gray hover:bg-gray-medium border border-t-0 border-gray hover:border-gray-300 p-1 ${
                productHasVariant && !state.isVariantActive
                  ? 'opacity-50 hover:bg-gray hover:border-gray-300'
                  : ''
              }`}
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
            disabled={
              product.stock === 0 || (productHasVariant && !state.isVariantActive) || isSubmitting
            }
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
