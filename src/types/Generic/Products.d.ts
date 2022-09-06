interface Product {
  id: string;
  name: string;
  active: boolean;
  description: string;
  slug: string;
  tags: string[];
  price: number;
  images?: string[];
  sale?: boolean;
  sku?: string;
}
