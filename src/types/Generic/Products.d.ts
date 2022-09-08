interface Product {
  id: string;
  name: string;
  active: boolean;
  description: string;
  slug: string;
  tags: string[];
  price: number;
  images?: ProductImage[];
  sale?: boolean;
  sku?: string;
}

interface ProductImage {
  url: string;
  alt?: string;
}
