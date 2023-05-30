import { ArrowLeft, ArrowRight } from './Arrows';
import { ActiveButton, PageLink } from './PagesButton';

import Container from '~/_layouts/Container';

interface Props {
  pagination: Pagination;
  query: FilterParams;
}

const Pagination = ({ pagination, query }: Props) => {
  const { pages, current } = pagination;

  return (
    <Container className="flex justify-center font-quicksand">
      <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px text-gray-medium rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <ArrowLeft current={current} query={query} />

              {pages.map((page, i) =>
                current === page ? (
                  <ActiveButton key={i} page={page} />
                ) : (
                  <PageLink key={i} page={page} query={query} />
                )
              )}

              <ArrowRight current={current} pages={pages} query={query} />
            </nav>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Pagination;
