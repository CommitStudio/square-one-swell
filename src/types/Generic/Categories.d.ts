interface Category {
  images: CategoryImage[];
  name: string;
  active: boolean; //TODO: Think if this is necessary?
  slug: { category: string };
  description: string;
  id: string;
}

interface FilterBy {
  title: string;
  item: FilterByItems[];
  slug: { minPrice?: number; maxPrice?: number; category?: string };
}

interface FilterByItems {
  name: string;
  slug: string | { minPrice?: number; maxPrice?: number | string; category?: string };
}
