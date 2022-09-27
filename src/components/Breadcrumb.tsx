import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const Breadcrumb = () => {
  const router = useRouter();
  console.log('ASPATH', router.asPath);
  console.log('PATHNAME', router.pathname);
  console.log('QUERY', router.query);

  // Remove any query parameters, as those aren't included in breadcrumbs
  const asPathWithoutQuery = router.asPath.split('?')[0];
  console.log('WITHOUT QUERY', asPathWithoutQuery);

  // Get the category name if exist
  const asPathQuery = router.query;
  const { category } = asPathQuery;
  console.log('CATEGORY', category);

  // Break down the path between "/"s, removing empty entities
  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const asPathNestedRoutes = asPathWithoutQuery.split('/').filter((v) => v.length > 0);
  console.log('NESTED ROUTES', asPathNestedRoutes);


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
        {category && (
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
              <Link href={`/${category}`}>
                <a className="ml-1 text-sm font-medium text-secondary hover:text-primary md:ml-2">
                  {category}
                </a>
              </Link>
            </div>
          </li>
        )}
        {asPathNestedRoutes.map((route) => {
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
                <Link href="/shop">
                  <a className="ml-1 text-sm font-medium text-secondary hover:text-primary md:ml-2">
                    {route}
                  </a>
                </Link>
              </div>
            </li>
          );
        })}
        {/* <li>
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
            <Link href="/shop">
              <a className="ml-1 text-sm font-medium text-secondary hover:text-primary md:ml-2">
                Shop
              </a>
            </Link>
          </div>
        </li>
        <li aria-current="page">
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
            <span className="ml-1 text-sm font-medium text-secondary md:ml-2 ">{title}</span>
          </div>
        </li> */}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
