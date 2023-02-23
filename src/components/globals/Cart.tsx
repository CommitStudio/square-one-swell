import Image from 'next/image';
import Link from 'next/link';

import { useStore } from '~/hooks/useStore';
import { swell } from '~/hooks/useSwellCart';
import { formatCurrency } from '~/utils/numbers';
import { notifySuccess } from '~/utils/toastifies';

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function determineIfIsCart(
  toBeDetermined: swell.Cart | object
): toBeDetermined is swell.Cart {
  if (toBeDetermined) {
    return true;
  }
  return false;
}

const Cart = ({ isCartOpen, setIsCartOpen }: Props) => {
  const { state, updateStateProp, updateState } = useStore();

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeProductFromCart = async (cartItemId: string, productVariantId: string) => {
    updateState({
      ...state,
      localCart: {
        ...state.localCart,
        items:
          determineIfIsCart(state.localCart) &&
          state.localCart.items.filter(
            (item) => item.product.id !== cartItemId && item.variant.id !== productVariantId
          )
      }
    });

    const cartWithoutItem = await swell.cart.removeItem(cartItemId);

    updateStateProp('localCart', cartWithoutItem);
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
        <nav className="border h-full bg-white md:w-[500px] w-screen text-secondary ml-auto sm:flex:flex-col justify-between">
          <div className="flex justify-between px-7 pt-7">
            <h3 className="mb-6 text-xl font-bold">
              Items:{' '}
              {determineIfIsCart(state.localCart) &&
                state?.localCart?.items?.reduce((acc, product) => acc + product.quantity, 0)}
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
            {determineIfIsCart(state.localCart) &&
            (state?.localCart?.items?.length === 0 ||
              state?.localCart?.items?.length === undefined) ? (
              <p className="">There are no items in your cart yet</p>
            ) : (
              <>
                <hr className="mb-5 opacity-20" />
                {determineIfIsCart(state.localCart) &&
                  state.localCart?.items?.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between pb-3 mb-3 border-b last-of-type:border-none gap-2 border-black border-opacity-20"
                    >
                      <div className="relative h-24 w-24 ">
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
                          {product.quantity} x ${formatCurrency(product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          void removeProductFromCart(product.id, product.variant.id);
                          notifySuccess(
                            'The item has been removed from your cart. Keep shopping or proceed to checkout'
                          );
                        }}
                        className="self-end hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </>
            )}
          </div>
          {/* checkout section */}
          <div className="fixed md:absolute bottom-0 w-full px-7 pb-7 bg-secondary text-xs">
            <hr className="mb-5 opacity-20" />
            <div className="grid grid-cols-2 text-base mb-3 text-white">
              <p>Subtotal</p>
              <p className="text-right">
                ${' '}
                {determineIfIsCart(state.localCart) && state.localCart.items
                  ? formatCurrency(
                      state.localCart.items?.reduce(
                        (acc, product) => acc + product.price * product.quantity,
                        0
                      )
                    )
                  : Number(0).toFixed(2)}
              </p>
              <p>Taxes</p>
              <p className="text-right">
                ${' '}
                {determineIfIsCart(state.localCart) && state.localCart.tax_total
                  ? formatCurrency(state.localCart.tax_total)
                  : Number(0).toFixed(2)}
              </p>
              <p className="text-2xl mt-3">Total</p>
              <p className="text-2xl mt-3 text-right">
                ${' '}
                {determineIfIsCart(state.localCart) && state.localCart.items
                  ? formatCurrency(
                      state.localCart.items?.reduce(
                        (acc, product) => acc + product.price * product.quantity,
                        0
                      ) + state.localCart.tax_total
                    )
                  : Number(0).toFixed(2)}
              </p>
            </div>
            <Link
              href={
                determineIfIsCart(state.localCart) && state.localCart.items?.length
                  ? `${String(process.env.PUBLIC_STORE_URL)}/checkout/${
                      (determineIfIsCart(state.localCart) && state.localCart.checkout_id) || ''
                    }`
                  : '#'
              }
            >
              <a className="bg-primary text-secondary p-3 w-full block text-center rounded-md mb-2 text-base font-bold tracking-wide hover:bg-white">
                CHECKOUT
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Cart;
