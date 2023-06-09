import Image from 'next/image';

import { useEffect } from 'react';

import Trash from 'public/img/icons/trash-02.svg';
import Button from '~/_components/Button';

import { useGlobalState } from '~/_hooks/useStore';
import swell from '~/_lib/SwellJS';
import { formatCurrency } from '~/_utils/numbers';
import { notifySuccess } from '~/_utils/toastifies';

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ isCartOpen, setIsCartOpen }: Props) => {
  const { cart, setCart } = useGlobalState();

  useEffect(() => {
    swell.cart
      .get()
      .then((cart) => {
        setCart(cart);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeProductFromCart = async (
    cartItemId: string,
    productVariantId: string,
    productID: string
  ) => {
    const newCart = { ...cart } as swell.Cart;

    const items = cart?.items.filter((item) =>
      item.variant
        ? item.product_id !== cartItemId && item.variant?.id !== productVariantId
        : item.product_id !== productID
    );

    if (items) {
      newCart.items = items;
    }

    setCart(newCart);

    const cartWithoutItem = await swell.cart.removeItem(cartItemId);
    setCart(cartWithoutItem);
  };

  return (
    <>
      {/* CART BODY */}
      {isCartOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 top-24 w-[100vw] h-[100vh] bg-black/40 z-20"
        ></div>
      )}
      <div
        className={`fixed right-0 bottom-0 top-24 z-30 transition-transform duration-700 ${
          isCartOpen ? '' : 'translate-x-full'
        }`}
      >
        <nav className="h-full bg-white md:w-[500px] w-screen border-t border-t-gray text-black ml-auto flex flex-col justify-between">
          <div className="flex justify-between px-7 pt-7">
            <h3 className="mb-6 text-xl font-bold">
              Items: ({cart?.items?.reduce((acc, product) => acc + product.quantity, 0)})
            </h3>
            <Image
              src="/img/close-logo.svg"
              alt="Close icon"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={closeCart}
            />
          </div>
          {/* products sections */}
          <div className="overflow-y-auto px-7 mb-auto">
            {cart?.items.length === 0 || cart === null ? (
              <p>There are no items in your cart yet!</p>
            ) : (
              <>
                <hr className="mb-5 opacity-20" />
                {cart?.items?.map((product) => (
                  <div
                    key={product.id}
                    className="flex space-x-4 pb-3 mb-3 border-b last-of-type:border-none border-black border-opacity-20"
                  >
                    <div className="relative h-24 w-24">
                      <Image
                        src={product.product?.images[0]?.file.url}
                        alt={product.product?.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex flex-col space-y-4 w-full" data-cy="cart-product">
                      <p className="font-bold uppercase">{product.product?.name}</p>
                      <div className="flex justify-between">
                        <div>
                          {product.variant && <p>Variant: {product.variant?.name}</p>}
                          <p>
                            {product.quantity} x{' '}
                            {product.product?.sale && (
                              <span className="text-gray line-through mx-2">
                                ${formatCurrency(product.product?.price)}
                              </span>
                            )}
                            ${formatCurrency(product.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            void removeProductFromCart(
                              product.id,
                              product.variant?.id,
                              product.product_id
                            );
                            notifySuccess('The item has been removed from your cart.');
                          }}
                          className="self-end hover:border-b"
                        >
                          <Image src={Trash as string} alt="Trash icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* checkout section */}
          <div className="w-full px-7 pb-7 bg-gray text-xs">
            <hr className="mb-5 opacity-0" />
            <div className="grid [grid-template-columns:2fr_1fr] text-base mb-3">
              <p>Subtotal</p>
              <p className="text-right">
                $ {cart?.items ? formatCurrency(cart.sub_total) : Number(0).toFixed(2)}
              </p>
              <p>Promo discounts</p>
              <p className="text-right">
                - ${' '}
                {cart?.discount_total ? formatCurrency(cart.discount_total) : Number(0).toFixed(2)}
              </p>
              <p className="text-xl mt-3 font-bold">Total</p>
              <p className="text-xl mt-3 text-right font-bold">
                ${' '}
                {cart?.items
                  ? formatCurrency(cart?.sub_total - cart?.discount_total)
                  : Number(0).toFixed(2)}
              </p>
            </div>

            <Button
              linkUrl={
                cart?.items?.length
                  ? `${String(process.env.PUBLIC_STORE_URL)}/checkout/${cart.checkout_id || ''}`
                  : '#'
              }
              label="CHECKOUT"
              fullWidth
              color="black"
              classes="!p-3 text-base mt-1"
              disabled={!cart?.items?.length}
            />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Cart;
