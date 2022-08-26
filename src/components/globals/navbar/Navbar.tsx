import Link from 'next/link';
import { useState } from 'react';

import data from '../../../data/partials.json';

import DesktopMenu from './DesktopMenu';
import Hamburger from './Hamburger';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import UserButtons from './UserButtons';

const Navbar = () => {
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
          <UserButtons />
          <Hamburger isOpen={isOpen} toggle={handleClick} />
          <DesktopMenu categories={data.categories} />
        </div>
      </div>
      <MobileMenu isOpen={isOpen} categories={data.categories} />
    </nav>
  );
};

export default Navbar;
