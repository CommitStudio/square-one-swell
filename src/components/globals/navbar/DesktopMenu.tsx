import Link from 'next/link';
import React from 'react';

type Props = {
  categories: any[];
};

const DesktopMenu = ({ categories }: Props) => {
  return (
    <div
      className="justify-between items-center w-full lg:w-auto lg:order-1 lg:flex"
      id="navbar-sticky"
    >
      <ul className="hidden bg-secondary mt-6 lg:flex lg:flex-row lg:p-4 lg:space-x-8 lg:mt-0">
        {categories.map((category) => {
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
  );
};

export default DesktopMenu;
