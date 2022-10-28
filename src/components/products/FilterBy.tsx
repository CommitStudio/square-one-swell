import Link from 'next/link';
import { useRouter } from 'next/router';

import { v4 as uuidv4 } from 'uuid';

import { toPascalCase } from '../Breadcrumb';

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
  const { updateStateProp } = useStore();
  const handleClick = (itemName: string) => {
    updateStateProp('breadcrumbSelectedCategory', itemName);
  };
  return (
    <div>
      <h5 className="font-bold mb-2">{title}</h5>
      {items.map((item) => {
        return (
          <>
            {title === 'Categories' || title === 'Prices' ? (
              <Link
                key={uuidv4()}
                href={{ pathname: pathname, query: { ...router.query, ...item.slug } }}
              >
                <div>
                  <a
                    onClick={() => handleClick(item.name)}
                    className={`cursor-pointer w-fit hover:text-secondary ${
                      Object.values(item.slug)
                        .map(String)
                        .every((v) => Object.values(router.query).map(String).includes(v))
                        ? 'text-secondary font-semibold text'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.name}
                  </a>
                </div>
              </Link>
            ) : (
              <div className="text-gray-500">{item.name}</div>
            )}
          </>
        );
      })}
    </div>
  );
};
