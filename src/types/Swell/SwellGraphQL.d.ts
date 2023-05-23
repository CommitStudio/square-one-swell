interface SwellGraphQL_AuthResponse {
  data: SwellGraphQL_AuthObject;
}

interface SwellGraphQL_AuthObject {
  session: {
    accountId: string;
  };
  account: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
