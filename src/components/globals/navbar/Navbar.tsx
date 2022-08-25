import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import data from '../../../data/partials.json';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import Hamburger from './Hamburger';
import UserButtons from './UserButtons';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState('hidden');
  const handleClick = () => {
    setIsOpen('');
    isOpen === '' && setIsOpen('hidden');
  };

  return (
    <nav className="fixed w-full z-20 top-0 left-0">
      <div className="bg-secondary p-4 sm:px-6 lg:py-2.5 lg:px-6 xl:px-16">
        <div className="flex flex-wrap justify-between items-center mx-auto lg:container">
          <Link href="/">
            <a className="flex items-center">
              <Logo brandLogo={data.brand_logo} brandName={data.brand_name} />
            </a>
          </Link>
          <UserButtons />
          <Hamburger toggle={handleClick} />
          <DesktopMenu categories={data.categories} />
        </div>
      </div>
      <MobileMenu isOpen={isOpen} categories={data.categories} />
    </nav>
  );
};

export default Navbar;
