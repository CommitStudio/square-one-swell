import { ArrowLeft, ArrowRight } from './Arrows';
import { ActiveButton, PageLink } from './PagesButton';

import Container from '~/layouts/Container';

const Pagination = ({ pagination }: { pagination: Pagination }) => {
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
              <ArrowLeft current={current} />

              {pages.map((page, i) =>
                current === page ? (
                  <ActiveButton key={i} page={page} />
                ) : (
                  <PageLink key={i} page={page} />
                )
              )}

              <ArrowRight current={current} pages={pages} />
            </nav>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Pagination;
