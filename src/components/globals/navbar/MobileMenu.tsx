import Link from 'next/link';
import React from 'react';

type Props = {
  isOpen: string;
  categories: any[];
};

const MobileMenu = ({ isOpen, categories }: Props) => {
  return (
    <div className={`${isOpen} w-full bg-primary lg:hidden`}>
      <ul className="text-secondary" aria-labelledby="navbarMenu">
        {categories.map((category) => {
          return (
            <li key={category.slug}>
              <Link href={`/${category.slug}`}>
                <a className="menu-link block py-3 px-4 text-secondary active:bg-secondary active:text-primary focus:text-primary sm:px-6 lg:text-white  lg:active:bg-secondary lg:active:text-primary  ">
                  {category.name}
                </a>
              </Link>
            </li>
          );
        })}
        <li className="block py-3 px-4 text-secondary  active:bg-secondary active:text-primary sm:px-6 lg:hidden lg:text-white focus:decoration-primary">
          SEARCH
        </li>
        <li className="block py-3 px-4 text-secondary active:bg-secondary active:text-primary sm:px-6 lg:hidden lg:text-white focus:decoration-primary">
          CART
        </li>
        <li className="block py-3 px-4 text-secondary active:bg-secondary active:text-primary sm:px-6 lg:hidden lg:text-white focus:decoration-primary">
          LOGIN
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
