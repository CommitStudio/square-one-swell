interface Product {
  id: string;
  name: string;
  active: boolean;
  description: string;
  slug: string;
  tags: string[];
  price: number;
  images?: ProductImage[];
  sale?: boolean | null;
  sku?: string | null;
}

interface ProductImage {
  src: string;
  alt?: string;
}
