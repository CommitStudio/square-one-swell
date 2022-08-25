import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import data from '../../../data/partials.json';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

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
              {data.brand_logo !== '' ? (
                <Image
                  width={165}
                  height={40}
                  alt="brand-logo"
                  src={data.brand_logo}
                  objectFit="contain"
                />
              ) : (
                <span className="self-center text-2xl py-1 font-semibold whitespace-nowrap text-primary">
                  {data.brand_name}
                </span>
              )}
            </a>
          </Link>
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

            {/* burger menu --------------------------------------------------------------------------------------------------------------------------- */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="lg:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <input type="checkbox" id="menu_checkbox" onClick={handleClick} />
              <label htmlFor="menu_checkbox">
                <div className="bg-primary"></div>
                <div className="bg-primary"></div>
                <div className="bg-primary"></div>
              </label>
            </button>
            {/* burger menu --------------------------------------------------------------------------------------------------------------------------- */}
          </div>
          <div
            className="justify-between items-center w-full lg:w-auto lg:order-1 lg:flex"
            id="navbar-sticky"
          >
            <ul className="hidden bg-secondary mt-6 lg:flex lg:flex-row lg:p-4 lg:space-x-8 lg:mt-0">
              {data.categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <Link href={`/${category.slug}`}>
                      <a className="menu-link block py-2 pr-4 pl-3 text-secondary hover:text-primary active:bg-primary active:text-secondary focus:text-primary lg:text-white  lg:active:bg-secondary lg:active:text-primary  ">
                        {category.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* ############################################################################################################################# */}
      <MobileMenu isOpen={isOpen} categories={data.categories} />
    </nav>
  );
};

export default Navbar;
