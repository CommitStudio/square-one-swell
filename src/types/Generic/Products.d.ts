interface Product {
  id: string;
  name: string;
  active: boolean;
  description: string;
  options?: ProductOption[];
  slug: string;
  tags?: string[];
  price: number;
  images?: ProductImage[];
  sale?: boolean | null;
  salePrice?: number | null;
  sku?: string | null;
}

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductOption {
  label: string;
  values: string[];
}
