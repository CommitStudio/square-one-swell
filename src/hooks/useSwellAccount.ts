import { useEffect, useState } from 'react';

import type { AccountInformation } from 'swell-js';

import { useGlobalState } from '~/hooks/useStore';
import swell from '~/lib/SwellJS';

import { notifyFailure, notifySuccess } from '~/utils/toastifies';

/*****************************************************************************
 * Register new user and return account information
 ****************************************************************************/
export const useRegister = (
  credentials: { first_name: string; last_name: string; email: string; password: string } | null
) => {
  const { setAccount } = useGlobalState();
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    if (!credentials) {
      return setUser(undefined);
    }

    swell.account
      .create(credentials)
      .then((account) => {
        setAccount(account);
        setUser(account);
        notifySuccess(
          'Congratulations! Your registration is complete. You can now start shopping and enjoy exclusive deals and offers.'
        );
      })
      .catch(() => setUser(null));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  return { user };
};

/*****************************************************************************
 * Update Account Info
 ****************************************************************************/
export const useUpdateAccount = (
  userDetails: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  } | null
) => {
  const { setAccount } = useGlobalState();
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    if (!userDetails) {
      return setUser(undefined);
    }

    swell.account
      .update(userDetails)
      .then((account) => {
        setUser(account);
        setAccount(account);
      })
      .catch(() => setUser(null));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  return { user };
};

/*****************************************************************************
 * Login user and return account information
 ****************************************************************************/
export const useLogin = (credentials: { email: string; password: string } | null) => {
  const { setAccount } = useGlobalState();
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    if (!credentials) {
      return setUser(undefined);
    }

    const { email, password } = credentials;

    swell.account
      .login(email, password)
      .then((account) => {
        setAccount(account);
        setUser(account);
        if (account) {
          notifySuccess(
            'Welcome! You are now logged in and can proceed to checkout or continue shopping'
          );
        } else {
          notifyFailure('Something went wrong. Please check your credentials');
        }
      })
      .catch(() => {
        setUser(null);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  return { user };
};

/*****************************************************************************
 * Check if the user is logged in
 ****************************************************************************/
export const useUserLogged = () => {
  const { setOrders, setCart, setAddresses, setCards, setAccount } = useGlobalState();

  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    getUserData()
      .then(({ account, cart, listOrders, addresses, userCards }) => {
        setOrders(listOrders);
        setCart(cart);
        setAddresses(addresses);
        setCards(userCards);
        setAccount(account);

        setUser(account);
      })
      .catch(() => {
        setOrders([]);
        setCart(null);
        setAddresses([]);
        setCards([]);
        setAccount(null);

        setUser(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user };
};

/*****************************************************************************
 * Fetch required user data from Swell
 ****************************************************************************/
const getUserData = async () => {
  const accountPromise = swell.account.get();
  const cartPromise = swell.cart.get();
  const orderPromise = getUserOrders();
  const AddressesPromise = swell.account.listAddresses();
  const listCards = swell.account.listCards();

  const [account, cart, listOrders, addresses, userCards] = await Promise.all([
    accountPromise,
    cartPromise,
    orderPromise,
    AddressesPromise,
    listCards
  ]);

  return { account, cart, listOrders, addresses: addresses.results, userCards: userCards.results };
};

/*****************************************************************************
 * Fetch user Orders
 ****************************************************************************/
const getUserOrders = async () => {
  const dataFromlistOrders = await swell.account.listOrders();
  const userOrders = dataFromlistOrders.results;
  return userOrders.map((order: Order) => ({
    id: order.id,
    number: order.number,
    status: order.status,
    delivered: order.delivered,
    date: order.date_created,
    items: order.item_quantity,
    total: order.grand_total,
    currency: order.currency,
    paid: order.paid,
    image1: order.items[0].product.images[0].file.url
  }));
};

/*****************************************************************************
 * Logout current user and redirect to home page
 ****************************************************************************/
export const useLogout = () => {
  const { setAccount } = useGlobalState();

  return async () => {
    await swell.account
      .logout()
      .then(() => {
        setAccount(null);
        document.location = '/';
      })
      .catch(() => notifyFailure('Something went wrong'))
      .finally(() =>
        notifySuccess(
          'You have been successfully logged out. Thank you for shopping with us. We hope to see you again soon!'
        )
      );
  };
};
