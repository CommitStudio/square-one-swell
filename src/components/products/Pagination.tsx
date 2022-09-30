import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from '~/layouts/Container';

const Pagination = ({ pages }: { pages: { start: number; end: number }[] }) => {
  const router = useRouter();
  const numberOfPages = Object.keys(pages).length;

  return (
    <Container className="flex justify-center mb-5">
      <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <Link
                href={
                  Number(router.query.page) > 1
                    ? {
                        pathname: '/products',
                        query: { page: Number(router.query.page) - 1 }
                      }
                    : {}
                }
              >
                <a
                  onClick={(ev) => (Number(router.query.page) > 1 ? null : ev.preventDefault())}
                  className={`${
                    Number(router.query.page) > 1
                      ? 'hover:bg-gray-50'
                      : 'bg-gray-200 cursor-default'
                  } relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500`}
                >
                  <span className="sr-only">Previous</span>

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </Link>
              {Object.keys(pages).map((page, i) => {
                return (
                  <Link key={i} href={{ pathname: '/products', query: { page: page } }}>
                    <a
                      className={`${
                        (Number(router.query.page) || 1) == Number(page)
                          ? 'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600'
                          : 'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </a>
                  </Link>
                );
              })}
              <Link
                href={
                  !router.query.page
                    ? {
                        pathname: '/products',
                        query: { page: 2 }
                      }
                    : Number(router.query.page) !== numberOfPages
                    ? {
                        pathname: '/products',
                        query: { page: Number(router.query.page) + 1 }
                      }
                    : {}
                }
              >
                <a
                  onClick={(ev) =>
                    Number(router.query.page) !== numberOfPages ? null : ev.preventDefault()
                  }
                  className={`${
                    Number(router.query.page) !== numberOfPages
                      ? 'hover:bg-gray-50'
                      : 'bg-gray-200 cursor-default'
                  } relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Pagination;
