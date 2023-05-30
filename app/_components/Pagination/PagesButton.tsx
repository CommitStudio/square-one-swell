'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  page: number;
  query: FilterParams;
}

/*****************************************************************************
 * Button used to show current page
 ****************************************************************************/
export const ActiveButton = ({ page }: { page: number }) => {
  return (
    <div className="relative z-10 inline-flex items-center border border-black bg-green text-black opacity-75 px-4 py-2 text-sm font-bold ">
      {page}
    </div>
  );
};

/*****************************************************************************
 * Button used to navigate to other pages
 ****************************************************************************/
export const PageLink = ({ page, query }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={{ pathname, query: { ...query, page: page } }}
      className="relative inline-flex items-center border border-gray-medium bg-white px-4 py-2 text-sm font-medium text-gray-medium hover:border-gray-dark hover:text-gray-dark hover:z-20"
    >
      {page}
    </Link>
  );
};
