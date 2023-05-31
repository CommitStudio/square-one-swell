'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect } from 'react';

import { useStore } from '~/_hooks/useStore';
import { toPascalCase } from '~/_utils/format';

const Breadcrumb = () => {
  const { state, updateStateProp, updateState } = useStore();
  const pathname = usePathname();

  // Break down the path between "/"s, removing empty entities - Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const mainRoute: string = pathname
    .split('/')
    .filter((route) => route.length > 0)
    .map((route) => toPascalCase(route))[0]; // Take just the first one

  // Set mainRoute globally at the first load
  useEffect(() => {
    updateStateProp('breadcrumbMainRoute', mainRoute);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Take the selected category from global store
  const currentCategory = state.breadcrumbSelectedCategory;

  // Join mainRoute & category (just if this one is not a '') - Ex:["Products", "Featured-Products"]
  const breadcrumbRoute = [mainRoute, currentCategory].filter((route) => route.length > 0);

  // Set the category as '' so this one will not be rendered when you click on the mainRoute & Close Filter menu
  const handleClick = () => {
    updateState({ ...state, isFilterOpen: false, breadcrumbSelectedCategory: '' });
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-normal hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbRoute.map((route, i) => {
          return (
            <li key={`route-${i}`}>
              <div className="flex font-normal items-center">
                <svg
                  className="w-6 h-6 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {i < breadcrumbRoute.length - 1 ? (
                  <Link
                    href={`/${route.toLowerCase()}`}
                    onClick={handleClick}
                    className="ml-1 text-sm font-normal hover:underline md:ml-2"
                  >
                    {route}
                  </Link>
                ) : (
                  <span className="ml-1 text-sm font-normal md:ml-2">{route}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
