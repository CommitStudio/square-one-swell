import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useStore } from '~/_hooks/useStore';

type Props = {
  categories: { name: string; slug: string; query?: string; hideOnDesktop: boolean }[];
};

const DesktopMenu = ({ categories }: Props) => {
  const pathname = usePathname();

  const { state, updateState } = useStore();

  const handleClick = () => {
    updateState({ ...state, isFilterOpen: false, breadcrumbSelectedCategory: '' });
  };

  return (
    <ul
      className="hidden mt-6 h-full justify-between items-center w-full lg:w-auto lg:order-1 lg:flex lg:space-x-10 lg:mt-0"
      id="navbar-sticky"
    >
      {categories.map((category, i) => {
        return (
          <li
            key={`category-${i}`}
            className={`${category.hideOnDesktop ? 'md:hidden' : ''} h-full`}
          >
            <Link
              href={`/${category.slug}`}
              className={`h-full hover:border-b-4 hover:border-black hover:font-bold flex items-center ${
                category.slug === pathname?.split('/')[1] ? 'border-b-4 border-black font-bold' : ''
              }`}
              onClick={handleClick}
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopMenu;
