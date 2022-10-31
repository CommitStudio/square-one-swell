interface Cart {
  tax_total: number;
  tax_included_total: number;
  sub_total: number;
  shipping: Shipping;
  shipment_total: number;
  shipment_price: number;
  shipment_discount: number;
  shipment_delivery: boolean;
  items: Item[];
  item_tax: number;
  item_shipment_weight: number;
  item_quantity: number;
  item_discount: number;
  guest: boolean;
  grand_total: number;
  giftcard_total: number;
  discount_total: number;
  date_created: string;
  date_abandoned: string;
  currency: string;
  checkout_url: string;
  checkout_id: string;
  capture_total: number;
  billing: Billing;
  auth_total: number;
  account_logged_in: boolean;
  account_id: string;
  id: string;
  promotions: Promotions;
  account: Account;
}

interface Item {
  variant_id: string;
  tax_total: number;
  tax_each: number;
  shipment_weight: number;
  quantity: number;
  product_id: string;
  price_total: number;
  price: number;
  orig_price: number;
  options: Option[];
  id: string;
  discount_total: number;
  discount_each: number;
  product: CartProduct;
  variant: Variant;
}

interface Option {
  id: string;
  value: string;
  name: string;
  variant: boolean;
  value_id: string;
}

interface CartProduct {
  stock_tracking: boolean;
  slug: string;
  sku?: string;
  sale: boolean;
  price: number;
  options: Option2[];
  name: string;
  images: SwellImage[];
  description?: string;
  attributes: Attributes;
  id: string;
}

interface Option2 {
  id: string;
  name: string;
  values: Value[];
  variant: boolean;
  input_type: string;
  required: boolean;
  active: boolean;
  attribute_id: string;
}

interface Value {
  id: string;
  name: string;
}

interface SwellImage {
  file: File;
  id: string;
}

interface File {
  id: string;
  date_uploaded: string;
  length: number;
  md5: string;
  content_type: string;
  url: string;
  width: number;
  height: number;
}

interface Attributes {
  material?: string[];
  color?: string[];
}

interface Variant {
  name: string;
  id: string;
}

interface Promotions {
  count: number;
  page: number;
}

interface Account {
  type: string;
  order_value: number;
  order_count: number;
  name: string;
  last_name: string;
  first_name: string;
  email_optin: boolean;
  email: string;
  date_created: string;
  balance: number;
  id: string;
  cards: Cards;
  addresses: Addresses;
}

interface Cards {
  count: number;
  page: number;
}

interface Addresses {
  count: number;
  page: number;
}
