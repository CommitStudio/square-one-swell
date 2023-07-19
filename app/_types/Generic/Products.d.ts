interface Product {
  id: string;
  name: string;
  active: boolean;
  dateCreated: string;
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
  stock?: number;
  reviewRating?: number;
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
  id: string;
  name: string;
  active: boolean;
  value_ids: Record<string, string> | string[];
  stock_variant: number;
  variantActive: boolean;
}

interface GenericProductsList {
  products: Product[];
  pagination: Pagination;
}
