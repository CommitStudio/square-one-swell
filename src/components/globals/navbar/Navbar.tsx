import Link from 'next/link';
import { useEffect, useState } from 'react';

import Cart from '~/components/globals/Cart';
import DesktopMenu from '~/components/globals/navbar/DesktopMenu';
import Hamburger from '~/components/globals/navbar/Hamburger';
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
    isCartOpen && setIsCartOpen(false);
  };

  useEffect(() => {
    isCartOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [isCartOpen]);

  return (
    <nav className="font-quicksand">
      <div className="fixed top-0 left-0 w-full h-24 p-8 sm:px-12 lg:py-0 lg:px-16 xl:px-32 flex justify-between bg-white z-20 border-b border-gray-medium">
        <Link href="/">
          <a className="flex self-center uppercase font-libre text-2xl text-black font-bold">
            Logo
          </a>
        </Link>
        <UserButtons toggleCart={toggleCart} />
        <DesktopMenu categories={data.categories} />
        <Hamburger isOpen={isHamburgerNavOpen} toggle={toggleHamburgerNav} />
      </div>
      <MobileMenu
        isOpen={isHamburgerNavOpen}
        setIsMenuOpen={setIsHamburgerNavOpen}
        categories={data.categories}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
