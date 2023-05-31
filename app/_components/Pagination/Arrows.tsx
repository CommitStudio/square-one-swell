'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  current: number;
  query: FilterParams;
}

/*****************************************************************************
 * Draw left arrow button
 ****************************************************************************/
export const ArrowLeft = ({ current, query }: Props) => {
  const pathname = usePathname();

  if (current === 1) {
    return (
      <div className="relative inline-flex items-center rounded-l-md border border-gray-medium bg-gray text-gray-medium px-2 py-2 text-sm font-bold">
        <ArrowLeftIcon />
      </div>
    );
  }

  return (
    <Link
      href={{
        pathname,
        query: { ...query, page: current - 1 }
      }}
      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-gray-200 px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-dark z-10"
    >
      <ArrowLeftIcon />
    </Link>
  );
};

/*****************************************************************************
 * Draw left arrow button
 ****************************************************************************/
export const ArrowRight = ({
  current,
  pages,
  query
}: {
  current: number;
  pages: number[];
  query: FilterParams;
}) => {
  const pathname = usePathname();

  if (current === pages.length) {
    return (
      <div className="relative inline-flex items-center rounded-r-md border border-gray-medium bg-gray text-gray-medium px-2 py-2 text-sm font-bold">
        <ArrowRightIcon />
      </div>
    );
  }

  return (
    <Link
      href={{
        pathname,
        query: { ...query, page: current + 1 }
      }}
      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-gray-200 px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-dark z-10"
    >
      <ArrowRightIcon />
    </Link>
  );
};

/*****************************************************************************
 * Icon used for left arrow
 ****************************************************************************/
const ArrowLeftIcon = () => (
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
);

/*****************************************************************************
 * Icon used for right arrow
 ****************************************************************************/
const ArrowRightIcon = () => (
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
);
