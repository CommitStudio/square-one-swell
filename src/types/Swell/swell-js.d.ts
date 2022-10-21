declare module 'swell-js' {
  export function init(store, key, opt = {});

  interface Account {
    login(email, password): Promise<unknown>;
  }

  export const account: Account;
}
