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
}
interface Items {
  product: ItemProduct;
}
interface Order {
  id: string;
  number: string;
  status: string;
  delivered: boolean;
  date_created: string;
  item_quantity: number;
  grand_total: number;
  currency: string;
  paid: boolean;
  items: Items[];
}
