import Link from 'next/link';
import { useEffect, useState } from 'react';

import Cart from '~/components/globals/Cart';
import DesktopMenu from '~/components/globals/navbar/DesktopMenu';
import Hamburger from '~/components/globals/navbar/Hamburger';
import Logo from '~/components/globals/navbar/Logo';
import MobileMenu from '~/components/globals/navbar/MobileMenu';
import UserButtons from '~/components/globals/navbar/UserButtons';

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
      <div className="fixed top-0 left-0 w-full h-24 p-4 sm:px-6 lg:py-2.5 lg:px-6 xl:px-16 flex justify-between bg-secondary z-20">
        <Link href="/">
          <a className="flex self-center">
            <Logo width={165} height={60} brandLogo={data.brand_logo} brandName={data.brand_name} />
          </a>
        </Link>
        <UserButtons toggleCart={toggleCart} />
        <DesktopMenu categories={data.categories} />
        <Hamburger isOpen={isHamburgerNavOpen} toggle={toggleHamburgerNav} />
      </div>
      <MobileMenu isOpen={isHamburgerNavOpen} categories={data.categories} />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
