'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import Cart from 'app/_components/globals/Cart';
import DesktopMenu from 'app/_components/navbar/DesktopMenu';
import Hamburger from 'app/_components/navbar/Hamburger';
import MobileMenu from 'app/_components/navbar/MobileMenu';
import UserButtons from 'app/_components/navbar/UserButtons';

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
          <Link
            href="/"
            className="flex self-center uppercase font-libre text-3xl text-black font-bold"
          >
            Logo
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
