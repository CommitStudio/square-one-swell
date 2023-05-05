import Link from 'next/link';
import { useEffect, useState } from 'react';

import Cart from '~/components/globals/Cart';
import DesktopMenu from '~/components/globals/navbar/DesktopMenu';
import Hamburger from '~/components/globals/navbar/Hamburger';
import MobileMenu from '~/components/globals/navbar/MobileMenu';
import UserButtons from '~/components/globals/navbar/UserButtons';

import data from '~/data/partials.json';
import Container from '~/layouts/Container';

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
      <div className="fixed top-0 left-0 w-full lg:py-0 bg-white z-20 border-b border-gray">
        <Container className="w-full flex justify-between items-center h-24">
          <Link href="/">
            <a className="flex self-center uppercase font-libre text-3xl text-black font-bold">
              Logo
            </a>
          </Link>
          <UserButtons toggleCart={toggleCart} />
          <DesktopMenu categories={data.categories} />
          <Hamburger isOpen={isHamburgerNavOpen} toggle={toggleHamburgerNav} />
        </Container>
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
