interface Category {
  images: CategoryImage[];
  name: string;
  active: boolean;
  slug: string;
  description: string;
  id: string;
}

interface CategoryImage {
  src: string;
  alt?: string;
}
