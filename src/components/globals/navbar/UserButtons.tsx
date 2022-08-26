import React, { useEffect, useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

type Props = {
  toggleCart: () => void;
};

const UserButtons = ({ toggleCart }: Props) => {
  return (
    <div className="flex lg:order-2">
      <button
        type="button"
        className="text-primary border-2 border-primary rounded-full px-2.5 py-2.5 text-center mr-3 hidden lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary"
        title="Search"
      >
        <FaSearch />
      </button>

      <button
        type="button"
        className="text-primary border-2 border-primary rounded-full px-2.5 py-2.5 text-center mr-3 hidden lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary"
        title="Cart"
        onClick={toggleCart}
      >
        <FaShoppingCart />
      </button>

      <button
        type="button"
        className="text-primary border-2 border-primary rounded-full px-2.5 py-2.5 text-center hidden lg:block hover:bg-primary hover:text-secondary active:bg-primary active:text-secondary"
        title="Login"
      >
        <FaUser />
      </button>
    </div>
  );
};

export default UserButtons;
