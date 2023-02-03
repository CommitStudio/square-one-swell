import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

import { Badge } from '../Badge';
import { determineIfIsCart } from '../Cart';

import { useStore } from '~/hooks/useStore';

type Props = {
  toggleCart: () => void;
};

const UserButtons = ({ toggleCart }: Props) => {
  const { state, updateStateProp } = useStore();
  const quantity = determineIfIsCart(state.localCart) && state.localCart.item_quantity;

  return (
    <div className="flex lg:order-2">
      <Link href="/products" title="Search">
        <a className="text-primary border-2 border-primary h-fit self-center rounded-full px-2.5 py-2.5 text-center mr-3 hidden transition-all duration-300 lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary">
          <FaSearch />
        </a>
      </Link>

      <button
        type="button"
        className="relative text-primary border-2 border-primary h-fit self-center rounded-full px-2.5 py-2.5 mr-3 hidden text-center transition-all duration-300 lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary"
        title="Cart"
        onClick={toggleCart}
      >
        <FaShoppingCart />
        {typeof quantity == 'number' && quantity > 0 && <Badge itemsQuantity={quantity} />}
      </button>
      <Link href="/account/orders" title="Login">
        <a
          className="text-primary border-2 border-primary h-fit self-center rounded-full px-2.5 py-2.5 text-center hidden transition-all duration-300 lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary"
          title="User Area"
        >
          <FaUser />
        </a>
      </Link>
    </div>
  );
};

export default UserButtons;
