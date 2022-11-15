interface SwellGraphQL_AuthResponse {
  data: {
    session: {
      accountId: string;
    };
    account: {
      name: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}
