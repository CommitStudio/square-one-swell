import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

type Props = {
  toggleCart: () => void;
};

const UserButtons = ({ toggleCart }: Props) => {
  return (
    <div className="flex lg:order-2">
      <button
        type="button"
        className="text-primary border-2 border-primary h-fit self-center rounded-full px-2.5 py-2.5 text-center mr-3 hidden transition-all duration-300 lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary"
        title="Search"
      >
        <FaSearch />
      </button>

      <button
        type="button"
        className="text-primary border-2 border-primary h-fit self-center rounded-full px-2.5 py-2.5 text-center mr-3 hidden transition-all duration-300 lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary"
        title="Cart"
        onClick={toggleCart}
      >
        <FaShoppingCart />
      </button>

      <Link href="/account/orders" title="Login">
        <a className="text-primary border-2 border-primary h-fit self-center rounded-full px-2.5 py-2.5 text-center hidden transition-all duration-300 lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary">
          <FaUser />
        </a>
      </Link>
    </div>
  );
};

export default UserButtons;
