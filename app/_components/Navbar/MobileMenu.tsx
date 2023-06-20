import Link from 'next/link';

import { useStore } from '~/_hooks/useStore';

type Props = {
  categories: { name: string; slug: string; query?: string }[];
  isAuthenticated: boolean;
  isOpen: boolean;
  isCartOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({
  categories,
  isAuthenticated,
  isOpen,
  isCartOpen,
  setIsMenuOpen,
  setIsCartOpen
}: Props) => {
  const { state, updateState } = useStore();

  const handleClick = (category: string) => {
    updateState({ ...state, isFilterOpen: false, breadcrumbSelectedCategory: '' });
    if (category === 'CART') setIsCartOpen(!isCartOpen);
    setIsMenuOpen(!isOpen);
  };

  return (
    <div
      role="button"
      className={`${
        !isOpen ? '-translate-y-full' : ''
      } fixed top-0 left-0 transition duration-700 z-10 w-full mt-24 bg-white drop-shadow-xl lg:hidden`}
    >
      <ul aria-labelledby="navbarMenu">
        {categories.map((category, i) => {
          if (!isAuthenticated && category.name === 'WISHLIST') return null;

          return (
            <li key={`mobile-menu-category-${i}`}>
              <Link
                href={`/${category.slug}`}
                onClick={() => handleClick(category.name)}
                className="
                 block py-3 px-4 active:bg-black active:text-white focus:text-white focus:bg-black sm:px-6 lg:text-white border-b border-b-gray"
              >
                {isAuthenticated && category.name === 'LOGIN' ? 'ACCOUNT' : category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileMenu;
