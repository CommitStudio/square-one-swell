interface Product {
  id: string;
  name: string;
  active: boolean;
  description: string;
  options?: ProductOption[];
  variants?: Variant[];
  slug: string;
  tags?: string[];
  price: number;
  images?: ProductImage[];
  sale?: boolean | null;
  salePrice?: number | null;
  sku?: string | null;
  categories?: string[];
}

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductOption {
  label: string;
  active: boolean;
  values: { id: string; name: string }[];
}

interface Variant {
  name: string;
  active: boolean;
  value_ids: string[];
}

interface GenericProductsList {
  products: Product[];
  pagination: Pagination;
}
