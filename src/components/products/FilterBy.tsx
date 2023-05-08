import Link from 'next/link';
import { useRouter } from 'next/router';

import { useStore } from '~/hooks/useStore';

export interface FilterItem {
  name: string;
  slug: { minPrice?: number; maxPrice?: number | string; category?: string };
}

export interface FilterByProps {
  title: string;
  items: FilterItem[];
  pathname: string;
}

export const FilterBy = ({ title, items, pathname }: FilterByProps) => {
  const router = useRouter();
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
        return title === 'Gender' ? (
          <p>
            {(item.name === 'Women' || item.name === 'Men') && (
              <Link
                key={`filter-item-${i}`}
                href={{ pathname: pathname, query: { ...router.query, ...item.slug } }}
                scroll={false}
              >
                <div>
                  <a
                    onClick={() => handleClick(item.name)}
                    className={`cursor-pointer w-fit hover:font-bold ${
                      Object.values(item.slug)
                        .map(String)
                        .every((v) => Object.values(router.query).map(String).includes(v))
                        ? 'text-black font-semibold text'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.name}
                  </a>
                </div>
              </Link>
            )}
          </p>
        ) : (
          item.name !== 'Men' && item.name !== 'Women' && (
            <Link
              key={`filter-item-${i}`}
              href={{ pathname: pathname, query: { ...router.query, ...item.slug } }}
              scroll={false}
            >
              <div>
                <a
                  onClick={() => {
                    handleClick(item.name);
                  }}
                  className={`cursor-pointer w-fit hover:font-bold transition-opacity duration-300 ${
                    Object.values(item.slug)
                      .map(String)
                      .every((v) => Object.values(router.query).map(String).includes(v))
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
