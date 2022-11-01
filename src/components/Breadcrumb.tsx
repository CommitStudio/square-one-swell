import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useStore } from '~/hooks/useStore';

// Transform each word to PascalCase format - Ex: "product" --> "Product"
export const toPascalCase = (word: string) => {
  return word.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
};

const Breadcrumb = () => {
  const { state, updateStateProp, updateState } = useStore();
  const router = useRouter();

  // Break down the path between "/"s, removing empty entities - Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const mainRoute: string = router.pathname
    .split('/')
    .filter((route) => route.length > 0)
    .map((route) => toPascalCase(route))[0]; // Take just the first one

  // Set mainRoute globally at the first load
  useEffect(() => {
    updateStateProp('breadcrumbMainRoute', mainRoute);
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
          <Link href="/">
            <a className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary">
              Home
            </a>
          </Link>
        </li>
        {breadcrumbRoute.map((route, i) => {
          return (
            <li key={uuidv4()}>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-secondary"
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
                  <Link href={`/${route.toLowerCase()}`}>
                    <a
                      onClick={handleClick}
                      className="ml-1 text-sm font-medium text-secondary hover:text-primary md:ml-2"
                    >
                      {route}
                    </a>
                  </Link>
                ) : (
                  <span className="ml-1 text-sm font-medium text-secondary md:ml-2 ">{route}</span>
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
