interface SwellAPI_CustomerResponse {
  data: SwellAPI_Customer;
}

interface SwellAPI_Customer {
  session: {
    accountId: string;
  };
  account: SwellAPI_Account;
  orders: {
    results: SwellAPI_Order[];
  };
}

interface SwellAPI_Account {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  billing: {
    accountCardId: string;
  };
}

interface SwellAPI_Order {
  id: string;
  number: string;
  status: string;
  delivered: boolean;
  dateCreated: string;
  itemQuantity: number;
  items: {
    quantity: number;
    price: number;
    discountEach: number;
    variant: {
      name: string;
    };
    product: {
      name: string;
      price: number;
      images: {
        file: {
          url: string;
        };
      }[];
    };
  }[];
  currency: string;
  paid: boolean;
  subTotal: number;
  shipmentPrice: number;
  taxTotal: number;
  grandTotal: number;
  shipping: {
    serviceName: string;
    address1: string;
    address2: string;
    city: string;
    zip: string;
    state: string;
    country: string;
    phone: string;
  };
  billing: {
    address1: string;
    address2: string;
    city: string;
    zip: string;
    state: string;
    country: string;
    card: {
      brand: string;
      last4: string;
      expMonth: string;
      expYear: string;
    };
  };
}

interface SwellAPI_Address {
  parent_id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  active: boolean;
  first_name: string;
  last_name: string;
  fingerprint: string;
  date_created: string;
  date_updated: string;
  id: string;
}

interface SwellAPI_Card {
  parent_id: string;
  exp_month: number;
  exp_year: number;
  token: string;
  last4: string;
  brand: string;
  address_check: string;
  zip_check: string;
  cvc_check: string;
  fingerprint: string;
  date_created: string;
  active: boolean;
  billing: function[];
  date_updated: string;
  id: string;
}
