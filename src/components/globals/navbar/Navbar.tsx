import Link from 'next/link';
import { useEffect, useState } from 'react';

import data from '../../../data/partials.json';
import Cart from '../Cart';

import DesktopMenu from './DesktopMenu';
import Hamburger from './Hamburger';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import UserButtons from './UserButtons';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    isCartOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [isCartOpen]);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav>
      <div className="fixed w-full z-20 top-0 left-0 bg-secondary p-4 sm:px-6 lg:py-2.5 lg:px-6 xl:px-16">
        <div className="flex flex-wrap justify-between items-center mx-auto lg:container">
          <Link href="/">
            <a className="flex items-center">
              <Logo brandLogo={data.brand_logo} brandName={data.brand_name} />
            </a>
          </Link>
          <UserButtons toggleCart={toggleCart} />
          <Hamburger isOpen={isOpen} toggle={handleClick} />
          <DesktopMenu categories={data.categories} />
        </div>
      </div>
      <MobileMenu isOpen={isOpen} categories={data.categories} />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
