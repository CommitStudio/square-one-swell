interface SwellGraphQL_AuthResponse {
  data: SwellGraphQL_AuthObject;
}

interface SwellGraphQL_AuthObject {
  session: {
    accountId: string;
  };
  account: SwellGraphQL_AccountObject;
  orders: {
    results: SwellGraphQL_OrdersObject[];
  };
}

interface SwellGraphQL_AccountObject {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  billing: {
    accountCardId: string;
  };
}

interface SwellGraphQL_OrdersObject {
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

interface SwellGraphQL_AddressObject {
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

interface SwellGraphQL_CardObject {
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
