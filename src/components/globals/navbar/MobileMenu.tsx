import Link from 'next/link';

import { useStore } from '~/hooks/useStore';

type Props = {
  isOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: { name: string; slug: string; query?: string }[];
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({ isOpen, categories, setIsMenuOpen, isCartOpen, setIsCartOpen }: Props) => {
  const { state, updateState } = useStore();

  const handleClick = (category: string) => {
    updateState({ ...state, isFilterOpen: false, breadcrumbSelectedCategory: '' });
    if (category === 'CART') setIsCartOpen(!isCartOpen);
    setIsMenuOpen(!isOpen);
  };

  return (
    <div
      className={`${
        !isOpen ? '-translate-y-full' : ''
      } fixed top-0 left-0 transition duration-700 z-10 w-full mt-24 bg-white drop-shadow-xl lg:hidden`}
    >
      <ul className="divide-y text-secondary" aria-labelledby="navbarMenu">
        {categories.map((category, i) => {
          return (
            <li key={`mobile-menu-category-${i}`}>
              <Link href={`/${category.slug}`}>
                <a
                  onClick={() => handleClick(category.name)}
                  className="
                   block py-3 px-4 text-secondary active:bg-secondary active:text-primary focus:text-primary focus:bg-secondary sm:px-6 lg:text-white  lg:active:bg-secondary lg:active:text-primary"
                >
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

export default MobileMenu;
