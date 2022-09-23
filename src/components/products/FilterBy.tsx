import Link from 'next/link';
import { useRouter } from 'next/router';

interface FilterByProps {
  title: string;
  items: {
    name: string;
    slug: { minPrice?: number; maxPrice?: number; category?: string };
  }[];
  pathname: string;
}

export const FilterBy = ({ title, items, pathname }: FilterByProps) => {
  const router = useRouter();

  return (
    <div>
      <h5 className="font-bold mb-2">{title}</h5>
      {items.map((item, i) => {
        console.log(item.slug);
        console.log(router.query.category == item.slug.category);
        return (
          <Link key={i} href={{ pathname: pathname, query: item.slug }}>
            <div>
              <a
                className={`cursor-pointer w-fit hover:text-secondary ${
                  router.query.category == item.slug?.category ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                {item.name}
              </a>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
