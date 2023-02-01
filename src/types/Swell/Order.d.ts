//falta terminar este tipado

interface SwellOrder {
  cart_id: string;
  draft: false;
  test: true;
  items: Items[];
  billing: {
    card: {
      brand: 'Visa';
      last4: '4242';
      exp_month: 3;
      exp_year: 2024;
      token: 'card_XW3WxpzAmGBPGLFmxsLT1oZY';
      address_check: 'unchecked';
      zip_check: 'unchecked';
      cvc_check: 'unchecked';
      fingerprint: '883f20e8bc00d0f9e1c42967b39a4f22';
      date_created: '2022-06-24T16:45:03.577Z';
    };
    first_name: 'Sheogorath';
    last_name: null;
    address1: 'New Sheoth Palace';
    address2: null;
    city: 'Shivering Isles';
    state: 'TX';
    zip: '78757';
    country: 'US';
    phone: null;
    company: null;
    account_card_id: null;
    method: 'card';
    use_account: false;
    default: false;
    name: 'Sheogorath';
  };
  shipping: {
    service: 'international';
    price: null;
    service_name: 'International';
    first_name: 'Sheogorath';
    last_name: null;
    company: '';
    address1: 'New Sheoth Palace';
    address2: null;
    city: 'Shivering Isles';
    zip: '78757';
    country: 'US';
    state: 'TX';
    phone: null;
    default: false;
    name: 'Sheogorath';
  };
  shipment_rating: {
    date_created: '2022-06-29T14:42:04.067Z';
    fingerprint: 'bc218e4a538adbdffe60fbb91dd6063e';
    services: [
      {
        id: 'standard';
        name: 'Standard Shipping';
        price: 5;
        description: 'Standard shipping service';
      },
      {
        id: 'express';
        name: 'Express Shipping';
        price: 15;
        description: 'Express shipping service';
      }
    ];
  };
  shipment_discount: 0;
  schedule: null;
  coupon_code: null;
  coupon_id: null;
  discounts: [
    {
      type: 'promo-62bc63e193cb7c0019423b6e';
      rule: {
        value_type: 'percent';
        value_percent: 15;
        total_min: 100;
        type: 'total';
      };
      amount: 43.5;
      id: 'promo-62bc63e193cb7c0019423b6e-0';
    }
  ];
  taxes: null;
  item_tax_included: null;
  shipment_tax: null;
  shipment_tax_included: null;
  promotion_ids: ['62bc63e193cb7c0019423b6e'];
  account_id: '62991607782f3b0013cf17af';
  account_logged_in: null;
  account_info_saved: false;
  account_credit_applied: null;
  account_credit_amount: null;
  giftcards: null;
  currency: 'USD';
  display_currency: null;
  display_locale: null;
  notes: 'Do we deliver to the Shivering Isles?';
  comments: null;
  gift: null;
  gift_message: null;
  metadata: null;
  shipment_delivery: true;
  date_trial_end: null;
  sub_total: 290;
  shipment_price: 0;
  shipment_total: 0;
  item_tax: 0;
  tax_included_total: 0;
  item_discount: 43.5;
  discount_total: 43.5;
  grand_total: 246.5;
  item_quantity_returned: 0;
  return_item_total: 0;
  return_item_tax: 0;
  return_item_tax_included: 0;
  return_total: 0;
  payment_balance: 0;
  paid: true;
  refunded: false;
  item_quantity_delivered: 6;
  item_quantity_deliverable: 0;
  delivered: true;
  item_quantity: 6;
  item_quantity_canceled: 0;
  item_quantity_cancelable: 0;
  item_quantity_shipment_deliverable: 0;
  item_quantity_returnable: 6;
  item_quantity_invoiced: 0;
  item_quantity_invoiceable: 6;
  item_quantity_credited: 0;
  item_quantity_creditable: 6;
  item_shipment_weight: 0;
  shipment_tax_included_total: 0;
  tax_total: 0;
  giftcard_total: 0;
  guest: true;
  authorized_payment_id: '62bc642d912a9800199ea467';
  date_created: '2022-06-29T14:39:42.350Z';
  hold: false;
  closed: false;
  status: 'complete';
  payment_total: 246.5;
  refund_total: 0;
  number: '100019';
  date_updated: '2022-06-29T14:42:04.247Z';
  payment_marked: true;
  auto_update_account_address: false;
  id: '62bc642d912a9800199ea465';
}

interface Items {
  product_id: '628ba3c7499bba0019b1a961';
  quantity: 1;
  price: 25;
  purchase_option: {
    type: 'standard';
    price: 25;
  };
  id: '62bc63892fafef0019eb2312';
  orig_price: 25;
  delivery: 'shipment';
  shipment_weight: 0;
  price_total: 25;
  discount_total: 3.75;
  discount_each: 3.75;
  tax_total: 0;
  tax_each: 0;
  discounts: [
    {
      id: 'promo-62bc63e193cb7c0019423b6e-0';
      amount: 3.75;
    }
  ];
  product_name: 'Mannimarco, King of Worms';
  quantity_total: 1;
  quantity_invoiceable: 1;
  quantity_creditable: 1;
  quantity_cancelable: 0;
  quantity_deliverable: 0;
  quantity_shipment_deliverable: 0;
  quantity_canceled: 0;
  quantity_delivered: 1;
  quantity_returnable: 1;
}
