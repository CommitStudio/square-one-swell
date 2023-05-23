interface SwellGraphQL_AuthResponse {
  data: SwellGraphQL_AuthObject;
}

interface SwellGraphQL_AuthObject {
  session: {
    accountId: string;
  };
  account: SwellGraphQL_AccountObject;
}

interface SwellGraphQL_AccountObject {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}
