import Image from 'next/image';
import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useStore } from '~/hooks/useStore';
import { swell } from '~/hooks/useSwellCart';

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ isCartOpen, setIsCartOpen }: Props) => {
  const { state, updateStateProp } = useStore();
  const [cart, setCart] = useState<swell.Cart | null>(null);

  const closeCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const getCart = async () => {
      const cart = await swell.cart.get();
      setCart(cart);
    };
    getCart().catch((err) => console.log(err));
  }, [state.triggerFetchCart]);

  const removeProductFromCart = async (cartItemId: string) => {
    await swell.cart.removeItem(cartItemId);
    updateStateProp('triggerFetchCart', !state.triggerFetchCart);
  };

  return (
    <>
      {/* CART BODY */}
      <div
        className={`fixed inset-0 top-24 z-30 transition-transform duration-700 ${
          isCartOpen ? '' : 'translate-x-full'
        }`}
      >
        <nav className="border h-full bg-white text-secondary ml-auto w-[500px] hidden lg:flex lg:flex-col justify-between">
          <div className="flex justify-between px-7 pt-7">
            <h3 className="mb-6 text-xl font-bold">
              Cart {cart?.items?.reduce((acc, product) => acc + product.quantity, 0)}
            </h3>
            <Image
              src="/img/close-logo.svg"
              alt="Close icon"
              layout="fixed"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={closeCart}
            />
          </div>
          <div className="overflow-y-auto px-7 mb-auto">
            <hr className="mb-5 opacity-20" />
            {cart?.items?.map((product) => (
              <div
                key={uuidv4()}
                className="flex justify-between pb-3 mb-3 border-b last-of-type:border-none border-black border-opacity-20"
              >
                <div className="relative h-24 w-24">
                  <Image
                    src={product.product?.images[0]?.file.url}
                    alt={product.product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-52">
                  <p>{product.product.name}</p>
                  <p>Variant: {product.variant?.name}</p>
                  <p>
                    {product.quantity} x ${product.price}
                  </p>
                </div>
                <button
                  onClick={() => void removeProductFromCart(product.id)}
                  className="self-end hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="px-7 pb-7 bg-secondary text-xs">
            <hr className="mb-5 opacity-20" />
            <div className="grid grid-cols-2 text-base mb-3 text-white">
              <p>Subtotal</p>
              <p className="text-right">
                $ {cart?.items?.reduce((acc, product) => acc + product.price * product.quantity, 0)}
              </p>
              <p>Taxes</p>
              <p className="text-right">$ {cart?.tax_total}</p>
              <p className="text-2xl mt-3">Total</p>
              <p className="text-2xl mt-3 text-right">
                ${' '}
                {Number(
                  cart?.items?.reduce((acc, product) => acc + product.price * product.quantity, 0)
                ) + Number(cart?.tax_total)}
              </p>
            </div>
            <button className="bg-primary text-secondary p-3 w-full rounded-md mb-2 text-base font-bold tracking-wide hover:bg-white">
              CHECKOUT
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Cart;
