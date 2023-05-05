import Image from 'next/image';

import Trash from 'public/img/icons/trash-02.svg';

import Button from '~/components/globals/button/Button';
import { useGlobalState } from '~/hooks/useStore';
import swell from '~/lib/SwellJS';
import { formatCurrency } from '~/utils/numbers';
import { notifySuccess } from '~/utils/toastifies';
type Props = {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ isCartOpen, setIsCartOpen }: Props) => {
  const { cart, setCart } = useGlobalState();

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeProductFromCart = async (cartItemId: string, productVariantId: string) => {
    const newCart = { ...cart } as swell.Cart;

    const items = cart?.items.filter(
      (item) => item.product.id !== cartItemId && item.variant.id !== productVariantId
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
              layout="fixed"
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
                        alt={product.product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col space-y-4 w-full">
                      <p className="font-bold uppercase">{product.product.name}</p>
                      <div className="flex justify-between">
                        <div>
                          <p>Variant: {product.variant?.name}</p>
                          <p>
                            {product.quantity} x ${formatCurrency(product.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            void removeProductFromCart(product.id, product.variant.id);
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
            <div className="grid grid-cols-2 text-base mb-3">
              <p>Subtotal</p>
              <p className="text-right">
                ${' '}
                {cart?.items
                  ? formatCurrency(
                      cart.items?.reduce(
                        (acc, product) => acc + product.price * product.quantity,
                        0
                      )
                    )
                  : Number(0).toFixed(2)}
              </p>
              <p>Taxes</p>
              <p className="text-right">
                $ {cart?.tax_total ? formatCurrency(cart.tax_total) : Number(0).toFixed(2)}
              </p>
              <p className="text-xl mt-3 font-bold">Total</p>
              <p className="text-xl mt-3 text-right font-bold">
                ${' '}
                {cart?.items
                  ? formatCurrency(
                      cart.items?.reduce(
                        (acc, product) => acc + product.price * product.quantity,
                        0
                      ) + cart.tax_total
                    )
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
            />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Cart;
