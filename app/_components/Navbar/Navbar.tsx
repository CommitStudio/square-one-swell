'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import DesktopMenu from './DesktopMenu';
import Hamburger from './Hamburger';
import MobileMenu from './MobileMenu';
import UserButtons from './UserButtons';

import Cart from '~/_components/Globals/Cart';

import data from '~/_data/partials.json';
import Container from '~/_layouts/Container';

const Navbar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
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
          <Link
            href="/"
            className="flex self-center uppercase font-libre text-3xl text-black font-bold"
          >
            Logo
          </Link>
          <UserButtons toggleCart={toggleCart} isAuthenticated={isAuthenticated} />
          <DesktopMenu categories={data.categories} />
          <Hamburger isOpen={isHamburgerNavOpen} toggle={toggleHamburgerNav} />
        </Container>
      </div>
      <MobileMenu
        categories={data.categories}
        isAuthenticated={isAuthenticated}
        isOpen={isHamburgerNavOpen}
        isCartOpen={isCartOpen}
        setIsMenuOpen={setIsHamburgerNavOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
