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
  values: string[];
}

interface Variant {
  name: string;
  active: boolean;
}
