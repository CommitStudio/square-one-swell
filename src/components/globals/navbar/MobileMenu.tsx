import Link from 'next/link';

type Props = {
  isOpen: boolean;
  categories: { name: string; slug: string }[];
};

const MobileMenu = ({ isOpen, categories }: Props) => {
  return (
    <div
      className={`${
        !isOpen ? '-translate-y-full' : ''
      } fixed top-0 left-0 transition duration-700 z-10 w-full mt-24 bg-white drop-shadow-xl lg:hidden`}
    >
      <ul className="divide-y text-secondary" aria-labelledby="navbarMenu">
        {categories.map((category) => {
          return (
            <li key={category.slug}>
              <Link href={`/${category.slug}`}>
                <a className="block py-3 px-4 text-secondary active:bg-secondary active:text-primary focus:text-primary focus:bg-secondary sm:px-6 lg:text-white  lg:active:bg-secondary lg:active:text-primary  ">
                  {category.name}
                </a>
              </Link>
            </li>
          );
        })}
        <li className="block py-3 px-4 text-secondary  active:bg-secondary active:text-primary focus:bg-secondary sm:px-6 lg:hidden lg:text-white">
          SEARCH
        </li>
        <li className="block py-3 px-4 text-secondary active:bg-secondary active:text-primary focus:bg-secondary sm:px-6 lg:hidden lg:text-white">
          CART
        </li>
        <li className="block py-3 px-4 text-secondary active:bg-secondary active:text-primary focus:bg-secondary sm:px-6 lg:hidden lg:text-white">
          LOGIN
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
