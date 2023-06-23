import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UpdatedCategory } from './Categories';

import { useStore } from '~/_hooks/useStore';

interface FilterByProps {
  query: FilterParams;
  category: UpdatedCategory;
}

export const FilterBy = ({ query, category }: FilterByProps) => {
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
      <Link
        href={{
          pathname: pathname,
          query: {
            ...query,
            ...category.slug
          }
        }}
        onClick={() => handleClick(category.name)}
        className={Object.values(query).includes(category.slug.category) ? 'underline' : ''}
      >
        <h5 className="font-bold uppercase">{category.name}</h5>
      </Link>
      {category.subCategories.map((subcategory, i) => {
        return (
          <Link
            href={{
              pathname: pathname,
              query: {
                ...query,
                ...subcategory.slug
              }
            }}
            key={`filter-item-${i}`}
          >
            <div>
              <a
                onClick={() => handleClick(subcategory.name)}
                className={`transition-opacity duration-300 inline-block hover:font-bold
                    ${
                      Object.values(query).includes(subcategory.slug.category)
                        ? 'font-bold underline'
                        : ''
                    }`}
              >
                {subcategory.name}
              </a>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
