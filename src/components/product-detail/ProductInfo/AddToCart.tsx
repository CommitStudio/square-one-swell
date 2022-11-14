import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStore } from '~/hooks/useStore';
import { swell } from '~/hooks/useSwellCart';

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
  const { state, updateStateProp } = useStore();

  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });

  const notifyFailure = (message: string) =>
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });

  useEffect(() => {
    product.options?.length === Object.keys(chosenOptions).length && setAreAllOptionsSelected(true);
    product.options?.length === Object.keys(chosenOptions).length && setPleaseSelectAllOptions('');
  }, [Object.keys(chosenOptions).length]);

  const addProduct = async ({ product, quantity, toastifyMessage }: AddProductProps) => {
    // Message of added product
    notifySuccess(toastifyMessage);

    // Add product to cart on Swell
    const cartWithNewItem = await swell.cart
      .addItem({
        product_id: product.id,
        quantity: quantity,
        options: Object.keys(chosenOptions).map((optionName) => ({
          name: optionName,
          value: chosenOptions[optionName]
        }))
      })
      .catch((err) => {
        console.log(err);

        // Message of error in case product is not added to cart on Swell
        notifyFailure(
          "There has been a problem, we couldn´t add the product to your cart. We're sorry."
        );
      });
    // Add product to localCart
    updateStateProp('localCart', cartWithNewItem);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex space-x-6 py-5">
        <div className="flex">
          <input
            type="number"
            name="product-quantity"
            value={productAmount}
            id="product-quantity"
            className="focus-visible:outline-none w-10 p-1 text-center border border-r-0 appearance-none"
            onChange={(e) => setProductAmount(Number(e.target.value))}
          />
          <div className="flex flex-col">
            <button
              className="bg-gray-200 hover:bg-gray-300 border border-b-0 hover:border-gray-300  p-1"
              onClick={() => setProductAmount(productAmount + 1)}
            >
              <IoIosArrowUp />
            </button>
            <button
              onClick={() => setProductAmount(productAmount - 1)}
              className="bg-gray-200 hover:bg-gray-300 border hover:border-gray-300 p-1"
            >
              <IoIosArrowDown />
            </button>
          </div>
        </div>
        <button
          onClick={
            !areAllOptionsSelected
              ? () => setPleaseSelectAllOptions('Please select the wanted options.')
              : state.isVariantActive
              ? () =>
                  void addProduct({
                    product: product,
                    quantity: productAmount,
                    toastifyMessage: `${productAmount} x ${product.name} added to cart`
                  })
              : void null
          }
          disabled={state.isVariantActive ? false : true}
          className={`font-bold py-3 px-5
         ${
           state.isVariantActive
             ? 'bg-secondary hover:bg-primary text-white hover:text-secondary duration-200'
             : 'bg-gray-600 text-gray-300'
         }`}
        >
          {state.isVariantActive ? 'ADD TO CART' : 'UNAVAILABLE'}
        </button>

        <button className="border p-3 text-gray-400 border-gray-200 hover:text-secondary hover:border-secondary duration-200">
          <AiOutlineHeart />
        </button>
      </div>
      {pleaseSelectAllOptions && <p className="text-red-500">{pleaseSelectAllOptions}</p>}
    </>
  );
};

export default AddToCart;
