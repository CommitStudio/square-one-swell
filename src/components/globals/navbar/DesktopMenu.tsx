import Link from 'next/link';

import { useStore } from '~/hooks/useStore';

type Props = {
  categories: { name: string; slug: string; query?: string; hideOnDesktop: boolean }[];
};

const DesktopMenu = ({ categories }: Props) => {
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
            className={`${
              category.hideOnDesktop ? 'md:hidden' : ''
            } h-full flex items-center hover:border-b-4 hover:border-black hover:font-bold`}
          >
            <Link href={`/${category.slug}`}>
              <a onClick={handleClick}>{category.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopMenu;
