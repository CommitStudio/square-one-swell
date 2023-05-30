import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useStore } from '~/hooks/useStore';

export interface FilterItem {
  name: string;
  slug: { minPrice?: number; maxPrice?: number | string; category?: string };
}

export interface FilterByProps {
  title: string;
  items: FilterItem[];
  query: FilterParams;
}

export const FilterBy = ({ title, items, query }: FilterByProps) => {
  const pathname = usePathname();
  const { updateState, state } = useStore();

  const handleClick = (itemName: string) => {
    updateState({
      ...state,
      isFilterOpen: !state.isFilterOpen,
      breadcrumbSelectedCategory: itemName
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="my-3">
      <h5 className="font-bold mb-4 md:mb-8 uppercase">{title}</h5>
      {items.map((item, i) => {
        delete query.page;
        return title === 'Gender' ? (
          <div key={i}>
            {(item.name === 'Women' || item.name === 'Men') && (
              <Link
                key={`filter-item-${i}`}
                href={{
                  pathname: pathname,
                  query: {
                    ...query,
                    ...item.slug
                  }
                }}
                scroll={false}
                legacyBehavior
              >
                <div>
                  <a
                    onClick={() => handleClick(item.name)}
                    className={`cursor-pointer w-fit hover:font-bold ${
                      Object.values(item.slug)
                        .map(String)
                        .every((v) => Object.values(query).map(String).includes(v))
                        ? 'text-black font-semibold text'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.name}
                  </a>
                </div>
              </Link>
            )}
          </div>
        ) : (
          item.name !== 'Men' && item.name !== 'Women' && (
            <Link
              key={`filter-item-${i}`}
              href={{ pathname: pathname, query: { ...query, ...item.slug } }}
              scroll={false}
              legacyBehavior
            >
              <div>
                <a
                  onClick={() => {
                    handleClick(item.name);
                  }}
                  className={`cursor-pointer w-fit hover:font-bold transition-opacity duration-300 ${
                    Object.values(item.slug)
                      .map(String)
                      .every((v) => Object.values(query).map(String).includes(v))
                      ? 'text-black font-semibold text'
                      : 'text-gray-500'
                  }`}
                >
                  {item.name}
                </a>
              </div>
            </Link>
          )
        );
      })}
    </div>
  );
};
