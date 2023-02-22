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
    <div
      className="justify-between items-center w-full lg:w-auto lg:order-1 lg:flex"
      id="navbar-sticky"
    >
      <ul className="hidden bg-secondary mt-6 lg:flex lg:flex-row lg:p-4 lg:space-x-8 lg:mt-0">
        {categories.map((category, i) => {
          return (
            <li key={`category-${i}`} className={`${category.hideOnDesktop ? 'md:hidden' : ''}`}>
              <Link href={`/${category.slug}`}>
                <a
                  onClick={handleClick}
                  className="block py-2 px-3 text-secondary hover:text-primary active:bg-primary active:text-secondary focus:text-primary lg:text-white  lg:active:bg-secondary lg:active:text-primary"
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

export default DesktopMenu;
