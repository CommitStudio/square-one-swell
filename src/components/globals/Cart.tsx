import Image from 'next/image';
import { useEffect, useState } from 'react';

import cartJson from '~/data/global/cart.json';

const { cart } = cartJson;

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    isCartOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [isCartOpen]);

  return (
    <>
      {/* CART BUTTON */}
      <button onClick={toggle} className="fixed bg-secondary rounded-md p-3 m-5">
        <span className="sr-only">Open cart</span>
        <div className=" text-white">Botón Carrito</div>
      </button>

      {/* CART BODY */}
      <div
        className={`fixed inset-0 top-[70px] z-30 transition-transform ${
          isCartOpen ? '' : 'translate-x-full'
        }`}
      >
        <nav className="bg-primary h-full text-secondary ml-auto sm:w-[500px] pl-7 pt-7 pb-7 flex flex-col justify-between">
          <div className="flex justify-between pr-7">
            <h3 className="mb-6 text-xl font-bold">Cart ({cart.products.length})</h3>
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
          <div className="overflow-y-auto pr-7 mb-auto">
            <hr className="mb-5 opacity-20" />
            {cart.products.map((product, i) => (
              <div
                key={i}
                className="flex justify-between pb-3 mb-3 border-b last-of-type:border-none border-black border-opacity-20"
              >
                <Image src={product.image.src} alt={product.image.alt} width={100} height={100} />
                <div>
                  <p>{product.name}</p>
                  <p>Size: {product.size}</p>
                  <p>Color: {product.color}</p>
                  <p>
                    {product.quantity} x ${product.price}
                  </p>
                </div>
                <p className="self-end cursor-pointer">Edit</p>
              </div>
            ))}
          </div>
          <div className="pr-7 text-xs">
            <hr className="mb-5 opacity-20" />
            <div className="grid grid-cols-2 text-base mb-3">
              <p>Subtotal</p>
              <p className="text-right">
                ${cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
              </p>
              <p>Shipping</p>
              <p className="text-right">$0.00</p>
              <p className="text-2xl mt-3">Total</p>
              <p className="text-2xl mt-3 text-right">
                ${cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
              </p>
            </div>
            <button className="bg-secondary text-white p-3 w-full rounded-md mb-2 text-base">
              CHECKOUT
            </button>
            <p className="text-right">{`© ${new Date().getFullYear()} Commit Store-Front`}</p>
          </div>
        </nav>
      </div>
      <div className="h-[300vh]"></div>
    </>
  );
};

export default Cart;
