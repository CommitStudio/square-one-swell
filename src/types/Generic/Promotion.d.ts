interface Promotion {
  id: string;
  name: string;
  active: boolean;
  currency: string;
  date_created: string;
  date_end: string;
  date_start: string;
  date_updated: string;
  description: string;
  discounts: Discounts[];
  limit_account_uses: number;
  limit_uses: number;
  use_count: number;
}

interface Discounts {
  type: string;
  value_type: string;
  value_fixed: number;
  product_id: string;
  buy_items: BuyItems[];
}

type BuyItems = { product_id?: 'string' };
