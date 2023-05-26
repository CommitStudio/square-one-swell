declare module 'swell-js' {
  export function init(store, key, opt = {});

  interface Account {
    update({
      first_name,
      last_name,
      email,
      password,
      billing
    }: {
      first_name?: string;
      last_name?: string;
      email?: string;
      password?: string;
      billing?: { account_card_id: string };
    }): Promise<AccountInformation>;
    create({
      first_name: string,
      last_name: string,
      email: string,
      password: string
    }): Promise<AccountInformation>;
    createCard(CardToken): Promise<Card>;
    createCard(CardToken): Promise<Card>;
    login(email, password): Promise<AccountInformation | null>;
    get(): Promise<AccountInformation | null>;
    logout(): Promise<unknown>;
    listOrders(): Promise<ListOrders>;
    getOrder(id: string): Promise<Order>; //get a specific order by id
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
    deleteAddress(id: string): Promise<SwellAddressResult>;
    updateAddress(
      id: string,
      {
        active: boolean,
        address1: string,
        address2: string,
        city: string,
        country: string,
        first_name: string,
        id: string,
        last_name: string,
        name: string,
        phone: string,
        zip: string
      }
    ): Promise<SwellAddressResult>;
    listCards(): Promise<SwellCardsResult>;
    deleteCard(id: string): Promise<SwellCardsResult>;
    recover(email): Promise<unknown>;
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
    billing: { account_card_id: string };
    email_optin: boolean;
    email: { email: string; code?: string; message?: string } | string;
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

  interface SwellCardsResult {
    count: number;
    page: number;
    results: SwellCard[];
  }

  interface SwellCard {
    active: boolean;
    address_check: string;
    brand: string;
    cvc_check: string;
    date_created: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    id: string;
    last4: string;
    parent_id: string;
    token: string;
    zip_check: string;
  }

  export const account: Account;
}
