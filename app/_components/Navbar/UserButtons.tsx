import Link from 'next/link';

import { FaHeart, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

import { Badge } from '~/_components/Globals/Badge';

import { useGlobalState } from '~/_hooks/useStore';

type Props = {
  toggleCart: () => void;
  isAuthenticated: boolean;
};

const UserButtons = ({ toggleCart, isAuthenticated }: Props) => {
  const { cart } = useGlobalState();
  const quantity = cart?.item_quantity;

  return (
    <div className="flex lg:order-2 space-x-2">
      <Link
        href="/products"
        title="Search"
        className="text-black border-2 border-black self-center rounded-full px-2.5 py-2.5 hidden transition-all duration-300 lg:block hover:bg-black hover:text-white active:bg-black active:text-white"
      >
        <FaSearch />
      </Link>

      <a
        href="/account/wishlist"
        title="Wishlist"
        className={`text-black border-2 border-black self-center rounded-full px-2.5 py-2.5 hidden transition-all duration-300 hover:bg-black hover:text-white active:bg-black active:text-white ${
          isAuthenticated ? 'lg:block' : 'lg:hidden'
        }`}
      >
        <FaHeart />
      </a>

      <button
        type="button"
        className="relative text-black border-2 border-black self-center rounded-full px-2.5 py-2.5 hidden transition-all duration-300 lg:block hover:bg-black hover:text-white active:bg-black active:text-white"
        title="Cart"
        onClick={toggleCart}
      >
        <FaShoppingCart data-cy="cart-icon" />
        {typeof quantity == 'number' && quantity > 0 && <Badge itemsQuantity={quantity} />}
      </button>
      <Link
        href={`/account/${isAuthenticated ? 'orders' : 'login'}`}
        title={isAuthenticated ? 'My Orders' : 'Login'}
        className="relative text-black border-2 border-black self-center rounded-full px-2.5 py-2.5 hidden transition-all duration-300 lg:block hover:bg-black hover:text-white active:bg-black active:text-white"
      >
        <FaUser data-cy="user-icon" />
        {isAuthenticated && (
          <div
            id="logged-badge"
            className="absolute top-0 -right-1 w-3 h-3 bg-green rounded-full"
          />
        )}
      </Link>
    </div>
  );
};

export default UserButtons;
