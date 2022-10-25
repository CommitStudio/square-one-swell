declare module 'swell-js' {
  export function init(store, key, opt = {});

  interface Account {
    login(email, password): Promise<AccountInformation | null>;
    get(): Promise<AccountInformation | null>;
    logout(): Promise<unknown>;
  }

  export interface AccountInformation {
    type: string;
    shipping: {
      account_address_id: string;
      name: string;
      first_name: string;
      last_name: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    phone?: string;
    order_value: number;
    order_count: number;
    name: string;
    last_name: string;
    first_name: string;
    email_optin: boolean;
    email: string;
    date_created: string;
    balance: number;
    id: string;
  }

  export const account: Account;
}
