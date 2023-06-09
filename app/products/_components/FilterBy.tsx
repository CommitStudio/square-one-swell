import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useStore } from '~/_hooks/useStore';

type PricesRanges = {
  name: string;
  slug: { minPrice: number | string; maxPrice: number | string };
};
export interface FilterItem {
  id: string;
  name: string;
  slug: { minPrice?: number; maxPrice?: number | string; category?: string };
  parent_id: string;
}

export interface FilterByProps {
  title: string;
  items: Category[] | PricesRanges[];
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

  const categoryNames = Object.keys(items);
  const allCategories: FilterItem[] = [];

  categoryNames.forEach((categoryName) => {
    allCategories.push(items[categoryName as keyof typeof items] as FilterItem);
  });

  const mainCategories = allCategories.filter((item) => !item.parent_id);

  const mainPopulated = mainCategories.map((item) => ({
    ...item,
    subCategories: allCategories.filter((i) => i.parent_id === item.id)
  }));

  return (
    <div className="my-3">
      <h5 className="font-bold mb-4 md:mb-8 uppercase">{title}</h5>
      {mainPopulated.map((item, i) => {
        return title === 'Gender' ? (
          <div key={i}>
            {(item.name === 'Women' || item.name === 'Men') && (
              <>
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
                {item.subCategories.map((subcategory, i) => {
                  return (
                    <Link
                      href={{
                        pathname: pathname,
                        query: {
                          ...query,
                          ...subcategory.slug
                        }
                      }}
                      key={i}
                    >
                      <div>
                        <a
                          onClick={() => handleClick(subcategory.name)}
                          className={`cursor-pointer w-fit hover:font-bold pl-3 text-sm ${
                            Object.values(subcategory.slug)
                              .map(String)
                              .every((v) => Object.values(query).map(String).includes(v))
                              ? 'text-black font-semibold underline'
                              : ''
                          }`}
                        >
                          {subcategory.name}
                        </a>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        ) : (
          item.name !== 'Men' && item.name !== 'Women' && (
            <>
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
              {item.subCategories.map((subcategory, i) => {
                return (
                  <Link
                    href={{
                      pathname: pathname,
                      query: {
                        ...query,
                        ...subcategory.slug
                      }
                    }}
                    key={i}
                  >
                    <div>
                      <a
                        onClick={() => handleClick(subcategory.name)}
                        className={`cursor-pointer w-fit hover:font-bold ${
                          Object.values(subcategory.slug)
                            .map(String)
                            .every((v) => Object.values(query).map(String).includes(v))
                            ? 'text-black font-semibold text'
                            : 'text-black'
                        }`}
                      >
                        {subcategory.name}
                      </a>
                    </div>
                  </Link>
                );
              })}
            </>
          )
        );
      })}
    </div>
  );
};
