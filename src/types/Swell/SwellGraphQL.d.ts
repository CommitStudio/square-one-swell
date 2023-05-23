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
    product: {
      images: {
        file: {
          url: string;
        };
      };
    }[];
  };
  currency: string;
  grandTotal: number;
  paid: boolean;
}
