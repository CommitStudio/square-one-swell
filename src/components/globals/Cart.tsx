import Image from 'next/image';

import data from '~/data/products.json';

type Props = {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ isCartOpen, setIsCartOpen }: Props) => {
  const closeCart = () => {
    setIsCartOpen(false);
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
            <h3 className="mb-6 text-xl font-bold">Cart ({data.products.length})</h3>
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
            {data.products.map((product, i) => (
              <div
                key={i}
                className="flex justify-between pb-3 mb-3 border-b last-of-type:border-none border-black border-opacity-20"
              >
                <div className="relative h-24 w-24">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
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
          <div className="px-7 pb-7 bg-secondary text-xs">
            <hr className="mb-5 opacity-20" />
            <div className="grid grid-cols-2 text-base mb-3 text-white">
              <p>Subtotal</p>
              <p className="text-right">
                ${data.products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
              </p>
              <p>Shipping</p>
              <p className="text-right">$0.00</p>
              <p className="text-2xl mt-3">Total</p>
              <p className="text-2xl mt-3 text-right">
                ${data.products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
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
