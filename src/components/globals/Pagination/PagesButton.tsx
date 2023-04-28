import Link from 'next/link';
import { useRouter } from 'next/router';

/*****************************************************************************
 * Button used to show current page
 ****************************************************************************/
export const ActiveButton = ({ page }: { page: number }) => {
  return (
    <div className="relative z-10 inline-flex items-center border border-secondary bg-green text-secondary opacity-75 px-4 py-2 text-sm font-bold ">
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
      <a className="relative inline-flex items-center border border-gray-medium bg-white px-4 py-2 text-sm font-medium text-gray-medium hover:border-gray-dark hover:text-gray-dark hover:z-20">
        {page}
      </a>
    </Link>
  );
};
