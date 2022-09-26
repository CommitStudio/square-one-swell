interface Product {
  id: string;
  name: string;
  active: boolean;
  description: string;
  options?: ProductOption[];
  variants?: Variants;
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
  values: string[];
}

interface Variants {
  count: number;
  results: Variant[];
  page: number;
}
interface Variant {
  parent_id: string;
  name: string;
  active: boolean;
  option_value_ids: string[];
  currency: string;
  date_created: string;
  date_updated: string;
  sku?: string;
  id: string;
}
