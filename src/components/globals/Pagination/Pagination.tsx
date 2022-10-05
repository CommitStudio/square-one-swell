import { ArrowLeft, ArrowRight } from './Arrows';
import { ActiveButton, PageLink } from './PagesButton';

import Container from '~/layouts/Container';

const Pagination = ({ pagination, pathname }: { pagination: Pagination; pathname: string }) => {
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
              <ArrowLeft current={current} pathname={pathname} />

              {pages.map((page, i) =>
                current === page ? (
                  <ActiveButton key={i} page={page} />
                ) : (
                  <PageLink key={i} page={page} pathname={pathname} />
                )
              )}

              <ArrowRight current={current} pages={pages} pathname={pathname} />
            </nav>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Pagination;
