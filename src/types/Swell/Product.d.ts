interface SwellProduct {
  name: string;
  active: boolean;
  cross_sells: [];
  currency: string;
  date_created: string;
  date_updated: string;
  description: string;
  meta_title?: string;
  meta_description?: string;
  options: SwellProductOption[];
  slug: string;
  stock_tracking: boolean;
  tags: string[];
  type: string;
  up_sells: [];
  delivery: string;
  tax_class: string;
  price: number;
  stock_status: string;
  images: SwellProductImage[];
  stock_level: number;
  popularity: number;
  prices: [];
  sale: boolean;
  sale_price?: number | null;
  sku?: string;
  id: string;
}

interface SwellProductImage {
  caption?: string;
  file: SwellProductFile;
  id: string;
}

interface SwellProductFile {
  width: number;
  height: number;
  id: string;
  length: number;
  date_uploaded: string;
  content_type: string;
  md5: string;
  url: string;
}

interface SwellProductOption {
  name: string;
  variant: boolean;
  active: boolean;
  values: {
    name: string;
    id: string;
  }[];
  required: boolean;
  id: string;
}

interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  maxProducts?: number;
  category?: string;
  slug?: string;
}
