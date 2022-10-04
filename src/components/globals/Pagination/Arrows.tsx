import Link from 'next/link';

export const ArrowLeft = ({ current }: { current: number }) => {
  if (current === 1) {
    return (
      <div className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-gray-200 px-2 py-2 text-sm font-medium text-gray-500">
        <ArrowLeftIcon />
      </div>
    );
  }

  return (
    <Link
      href={{
        pathname: '/products',
        query: { page: current - 1 }
      }}
    >
      <a className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
        <ArrowLeftIcon />
      </a>
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
