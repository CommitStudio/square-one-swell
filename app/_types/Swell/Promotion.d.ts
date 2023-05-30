interface SwellPromotion {
  id: string;
  name: string;
  active: boolean;
  currency: string;
  date_created: string;
  date_end: string;
  date_start: string;
  date_updated: string;
  description: string;
  discounts: SwellDiscounts[];
  limit_account_uses: number;
  limit_uses: number;
  use_count: number;
}

interface SwellDiscounts {
  type: string;
  value_type: string;
  value_fixed: number;
  product_id: string;
}
