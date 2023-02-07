declare module 'swell-js' {
  export function init(store, key, opt = {});

  interface Account {
    update({
      first_name: string,
      last_name: string,
      email: string,
      password: string
    }): Promise<AccountInformation>;
    create({
      first_name: string,
      last_name: string,
      email: string,
      password: string
    }): Promise<AccountInformation>;
    login(email, password): Promise<AccountInformation | null>;
    get(): Promise<AccountInformation | null>;
    logout(): Promise<unknown>;
    listOrders(): Promise<ListOrders>;
    listAddresses(): Promise<SwellAddress>;
    createAddress({
      name: string,
      address1: string,
      address2: string,
      city: string,
      zip: string,
      country: string,
      phone: string
    }): Promise<SwellAddressResult>;
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
    orders: Order[];
    name: string;
    last_name: string;
    first_name: string;
    email_optin: boolean;
    email: string;
    date_created: string;
    balance: number;
    id: string;
  }

  interface SwellAddress {
    count: number;
    page: number;
    results: SwellAddressResult[];
  }

  interface SwellAddressResult {
    active: boolean;
    address1: string;
    address2: string | null;
    city: string;
    country: string;
    date_created: string;
    fingerprint: string;
    first_name: string;
    id: string;
    last_name: string;
    name: string;
    parent_id: string;
    phone: string | null;
    zip: string | null;
  }

  export const account: Account;
}
