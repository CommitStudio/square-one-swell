import Link from 'next/link';

type Props = {
  categories: { name: string; slug: string; query?: string }[];
};

const DesktopMenu = ({ categories }: Props) => {
  return (
    <div
      className="justify-between items-center w-full lg:w-auto lg:order-1 lg:flex"
      id="navbar-sticky"
    >
      <ul className="hidden bg-secondary mt-6 lg:flex lg:flex-row lg:p-4 lg:space-x-8 lg:mt-0">
        {categories.map((category, i) => {
          return (
            <li key={i}>
              <Link
                passHref
                href={
                  category.query
                    ? { pathname: '/products', query: { category: category.slug } }
                    : `/${category.slug}`
                }
              >
                <a className="block py-2 px-3 text-secondary hover:text-primary active:bg-primary active:text-secondary focus:text-primary lg:text-white  lg:active:bg-secondary lg:active:text-primary">
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
