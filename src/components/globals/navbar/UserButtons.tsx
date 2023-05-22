import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

import { Badge } from '../Badge';

import { useGlobalState } from '~/hooks/useStore';
import { useUserLogged } from '~/hooks/useSwellAccount';

type Props = {
  toggleCart: () => void;
};

const UserButtons = ({ toggleCart }: Props) => {
  const { cart } = useGlobalState();
  const { user } = useUserLogged();
  const quantity = cart?.item_quantity;
  console.log(user);

  return (
    <div className="flex lg:order-2 space-x-2">
      <Link href="/products" title="Search">
        <a className="text-black border-2 border-black self-center rounded-full px-2.5 py-2.5 hidden transition-all duration-300 lg:block hover:bg-black hover:text-white active:bg-black active:text-white">
          <FaSearch />
        </a>
      </Link>

      <button
        type="button"
        className="relative text-black border-2 border-black self-center rounded-full px-2.5 py-2.5 hidden transition-all duration-300 lg:block hover:bg-black hover:text-white active:bg-black active:text-white"
        title="Cart"
        onClick={toggleCart}
      >
        <FaShoppingCart />
        {typeof quantity == 'number' && quantity > 0 && <Badge itemsQuantity={quantity} />}
      </button>
      <Link href="/account/orders" title="Login">
        <a
          className="relative text-black border-2 border-black self-center rounded-full px-2.5 py-2.5 hidden transition-all duration-300 lg:block hover:bg-black hover:text-white active:bg-black active:text-white"
          title="User Area"
        >
          <FaUser />
          {user && <div className="absolute top-0 -right-1 w-3 h-3 bg-green rounded-full" />}
        </a>
      </Link>
    </div>
  );
};

export default UserButtons;
