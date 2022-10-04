import Link from 'next/link';
import { useRouter } from 'next/router';

import { ArrowLeft } from './Arrows';
import { ActiveButton, PageLink } from './PagesButton';

import Container from '~/layouts/Container';

const Pagination = ({ pagination }: { pagination: Pagination }) => {
  const router = useRouter();

  const { pages, current } = pagination;

  return (
    <Container className="flex justify-center mb-5">
      <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <ArrowLeft current={current} />

              {pages.map((page, i) =>
                current === page ? (
                  <ActiveButton key={i} page={page} />
                ) : (
                  <PageLink key={i} page={page} />
                )
              )}

              <Link
                href={
                  !router.query.page
                    ? {
                        pathname: '/products',
                        query: { page: 2 }
                      }
                    : current !== pages.length
                    ? {
                        pathname: '/products',
                        query: { page: Number(router.query.page) + 1 }
                      }
                    : {}
                }
              >
                <a
                  onClick={(ev) => (current !== pages.length ? null : ev.preventDefault())}
                  className={`${
                    current !== pages.length ? 'hover:bg-gray-50' : 'bg-gray-200 cursor-default'
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
