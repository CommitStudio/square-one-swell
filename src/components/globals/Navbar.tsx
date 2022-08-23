import Link from 'next/link';
import { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-secondary px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary">
              FRONT STORE
            </span>
          </a>
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-primary border-2 border-primary rounded-full px-2.5 py-2.5 text-center mr-3 hidden md:block hover:bg-primary hover:text-secondary"
            title="Search"
          >
            <FaSearch />
          </button>

          <button
            type="button"
            className="text-primary border-2 border-primary rounded-full px-2.5 py-2.5 text-center mr-3 hidden md:block hover:bg-primary hover:text-secondary"
            title="Cart"
          >
            <FaShoppingCart />
          </button>

          <button
            type="button"
            className="text-primary border-2 border-primary rounded-full px-2.5 py-2.5 text-center mr-3 hidden md:block hover:bg-primary hover:text-secondary"
            title="Login"
          >
            <FaUser />
          </button>

          {/* burger menu ##### */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-primary rounded-lg md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {/* ################## */}
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link href="#">
                <a
                  className="block py-2 pr-4 pl-3 md:p-0 text-white hover:text-primary focus:text-primary"
                  aria-current="page"
                >
                  WOMEN
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a className="block py-2 pr-4 pl-3 text-white hover:text-primary focus:text-primary md:p-0">
                  MEN
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a className="block py-2 pr-4 pl-3 text-white hover:text-primary focus:text-primary md:p-0">
                  ABOUT US
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a className="block py-2 pr-4 pl-3 text-white hover:text-primary focus:text-primary md:p-0">
                  CONTACT
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
