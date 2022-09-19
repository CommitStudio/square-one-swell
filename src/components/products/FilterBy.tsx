import Link from 'next/link';

interface FilterByProps {
  title: string;
  items: {
    name: string;
    slug: { minPrice: number; maxPrice?: number } | string;
  }[];
  pathname: string;
}

export const FilterBy = ({ title, items, pathname }: FilterByProps) => {
  return (
    <div>
      <h5 className="font-bold mb-2">{title}</h5>
      {items.map((item, i) => {
        return (
          <Link key={i} href={{ pathname, query: item.slug }}>
            <div>
              <a className="cursor-pointer w-fit text-gray-500 hover:text-secondary">{item.name}</a>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
