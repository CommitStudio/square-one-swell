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
