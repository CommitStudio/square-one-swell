'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import 'react-toastify/dist/ReactToastify.css';

import { Spinner } from '~/_components/Globals/Spinner';

import { useStore, useProductState, useGlobalState, useWishlistState } from '~/_hooks/useStore';
import swell from '~/_lib/SwellJS';
import { notifyFailure, notifySuccess } from '~/_utils/toastifies';

interface ProductProp {
  product: Product;
  toggleWishlistAction: (productId: string) => Promise<string[]>;
  getWishlistIdsAction: () => Promise<string[]>;
}

interface AddProductProps {
  product: Product;
  quantity: number;
  toastifyMessage: string;
}

const AddToCart = ({ product, toggleWishlistAction, getWishlistIdsAction }: ProductProp) => {
  const [productAmount, setProductAmount] = useState(1);
  const [pleaseSelectAllOptions, setPleaseSelectAllOptions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const { wishlistIds, setwishlistIds } = useWishlistState();
  const { state } = useStore();
  const { productState } = useProductState();
  const { setCart } = useGlobalState();

  const { chosenOptions } = productState;

  useEffect(() => {
    product.options?.length === Object.keys(chosenOptions).length;
    product.options?.length === Object.keys(chosenOptions).length && setPleaseSelectAllOptions('');
  }, [chosenOptions, product.options?.length]);

  // Check if wishlist is on global store, if not, get it from Swell
  useEffect(() => {
    if (wishlistIds != null) return;

    const getWishlistOnFirstRender = async () => {
      const wishlistIds = await getWishlistIdsAction();
      setwishlistIds([...wishlistIds]);
    };
    getWishlistOnFirstRender().catch((err) => console.log(err));
  }, [getWishlistIdsAction, setwishlistIds, wishlistIds]);

  const addProduct = async ({ product, quantity, toastifyMessage }: AddProductProps) => {
    // Turn on spinner while waiting
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
        setIsLoading(false);
      });
  };

  const handleAddToCart = () => {
    void addProduct({
      product: product,
      quantity: productAmount,
      toastifyMessage: `${productAmount} x ${product.name} has been successfully added to your cart.`
    });
  };

  const handleToggleWishlist = async () => {
    setIsWishlistLoading(true);
    const wishlistIds = await toggleWishlistAction(product.id);

    if (wishlistIds.includes(product.id)) {
      setwishlistIds([...wishlistIds]);
      setIsWishlistLoading(false);
    } else {
      setwishlistIds([...wishlistIds]);
      setIsWishlistLoading(false);
    }
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
            disabled={product.options?.length === 0 ? false : !state.isVariantActive || isLoading}
            className={`font-bold py-3 px-5 md:min-w-[240px]
         ${
           state.isVariantActive || product.options?.length === 0
             ? 'bg-black font-quicksand border text-white duration-200 cursor-pointer hover:bg-white hover:text-black'
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

          {isWishlistLoading ? (
            <Spinner size={5} />
          ) : (
            <button
              onClick={() => {
                handleToggleWishlist().catch((err) => console.log(err));
              }}
              className="py-3 hover:text-secondary hover:border-secondary duration-200"
            >
              <AiOutlineHeart
                className={`h-6 w-6 ${wishlistIds?.includes(product.id) ? 'text-red-500' : ''}`}
              />
            </button>
          )}
        </span>
      </div>
      {pleaseSelectAllOptions && (
        <p className="text-red-500 font-quicksand">{pleaseSelectAllOptions}</p>
      )}
    </>
  );
};

export default AddToCart;
