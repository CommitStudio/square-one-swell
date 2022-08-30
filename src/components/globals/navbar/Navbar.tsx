import Link from 'next/link';
import { useEffect, useState } from 'react';

import Cart from '../Cart';

import DesktopMenu from './DesktopMenu';
import Hamburger from './Hamburger';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import UserButtons from './UserButtons';

import data from '~/data/partials.json';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHamburgerNavOpen, setIsHamburgerNavOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const toggleHamburgerNav = () => {
    setIsHamburgerNavOpen((prev) => !prev);
  };

  useEffect(() => {
    isCartOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [isCartOpen]);

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
          <Hamburger isOpen={isHamburgerNavOpen} toggle={toggleHamburgerNav} />
          <DesktopMenu categories={data.categories} />
        </div>
      </div>
      <MobileMenu isOpen={isHamburgerNavOpen} categories={data.categories} />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
