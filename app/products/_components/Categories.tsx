import { FilterBy } from './FilterBy';

export interface UpdatedCategory extends Omit<Category, 'slug'> {
  slug: { category?: string };
  parent_id: string;
  subCategories: {
    name: string;
    slug: { category: string };
  }[];
}

export interface FilterByProps {
  categories: Category[];
  query: FilterParams;
}

const Categories = ({ categories, query }: FilterByProps) => {
  const categoryNames = Object.keys(categories);
  const allCategories: UpdatedCategory[] = [];

  categoryNames.forEach((categoryName) => {
    allCategories.push(categories[categoryName as keyof typeof categories] as UpdatedCategory);
  });

  const mainCategories = allCategories.filter((item) => !item.parent_id);

  const mainPopulated = mainCategories
    .map((item) => ({
      ...item,
      subCategories: allCategories
        .filter((i) => i.parent_id === item.id)
        .map((i) => ({ name: i.name, slug: { category: i.slug.category ?? '' } }))
    }))
    .sort((a, b) => (a.subCategories.length < b.subCategories.length ? 1 : -1));

  return (
    <div className={`grid auto-cols-auto grid-flow-col mt-3 mb-16`}>
      {mainPopulated.map((category, i) => {
        return <FilterBy key={i} category={category} query={query} />;
      })}
    </div>
  );
};

export default Categories;
