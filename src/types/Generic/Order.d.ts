interface ListOrders {
  count: number;
  page: number;
  results: Order[];
}

interface UserOrder {
  id: string;
  number: string;
  status: string;
  delivered: boolean;
  date: string;
  items: number;
  total: number;
  currency: string;
  paid: boolean;
  image1: string;
}

interface ItemProductVariant {
  id: string;
  name: string;
  sku: null;
}

interface ItemProductImageFile {
  url: string;
}
interface ItemProductImage {
  file: ItemProductImageFile;
  id: string;
}
interface ItemProduct {
  id: string;
  images: ItemProductImage[];
  name: string;
}
interface Items {
  product: ItemProduct;
  price: number;
  variant: ItemProductVariant;
  discount_each: number;
  quantity: number;
}
interface Order {
  id: string;
  number: string;
  status: string;
  delivered: boolean;
  date_created: string;
  item_quantity: number;
  grand_total: number;
  sub_total: number;
  shipment_price: number;
  tax_total: number;
  currency: string;
  paid: boolean;
  items: Items[];
  date_created: string;
  shipping: OrderShipping;
  billing: OrderBilling;
}

interface OrderShipping {
  service_name: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  first_name: string;
  last_name: string;
  phone: string;
  price: number;
  zip: string;
  state: string;
}

interface OrderBilling {
  card: BillingCard;
  address1: string;
  city: string;
  country: string;
  zip: string;
  method: string;
  state: string;
}
interface BillingCard {
  brand: string;
  last4: string;
  exp_month: string;
  exp_year: string;
}
