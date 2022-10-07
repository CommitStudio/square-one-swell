import Link from 'next/link';
import { useRouter } from 'next/router';

/*****************************************************************************
 * Button used to show current page
 ****************************************************************************/
export const ActiveButton = ({ page }: { page: number }) => {
  return (
    <div className="'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600'">
      {page}
    </div>
  );
};

/*****************************************************************************
 * Button used to navigate to other pages
 ****************************************************************************/
export const PageLink = ({ page }: { page: number }) => {
  const { pathname, query } = useRouter();

  return (
    <Link href={{ pathname, query: { ...query, page: page } }}>
      <a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
        {page}
      </a>
    </Link>
  );
};
