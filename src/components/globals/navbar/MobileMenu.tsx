import Link from 'next/link';

import { useGlobalState, useStore } from '~/hooks/useStore';

type Props = {
  isOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: { name: string; slug: string; query?: string }[];
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({ isOpen, categories, setIsMenuOpen, isCartOpen, setIsCartOpen }: Props) => {
  const { state, updateState } = useStore();
  const { account } = useGlobalState();

  const isLogged = account && account.id ? true : false;

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
      } fixed top-0 left-0 transition duration-700 z-10 w-full mt-24 bg-white drop-shadow-xl lg:hidden border-t border-black`}
    >
      <ul className="divide-y text-black" aria-labelledby="navbarMenu">
        {categories.map((category, i) => {
          return (
            <li key={`mobile-menu-category-${i}`}>
              <Link href={`/${category.slug}`}>
                <a
                  onClick={() => handleClick(category.name)}
                  className="
                   block py-3 px-4 active:bg-black active:text-white focus:text-white focus:bg-black sm:px-6 lg:text-white"
                >
                  {isLogged && category.name === 'LOGIN' ? 'ACCOUNT' : category.name}
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
