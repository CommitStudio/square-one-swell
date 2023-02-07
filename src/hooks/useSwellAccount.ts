import { useEffect, useState } from 'react';
import swell from 'swell-js';

import type { AccountInformation } from 'swell-js';

swell.init(process.env.PUBLIC_SWELL_STORE_ID, process.env.PUBLIC_SWELL_PUBLIC_KEY);

import { useStore } from '~/hooks/useStore';
import { notifyFailure, notifySuccess } from '~/utils/toastifies';

/*****************************************************************************
 * Register new user and return account information
 ****************************************************************************/
export const useRegister = (
  credentials: { first_name: string; last_name: string; email: string; password: string } | null
) => {
  const { updateStateProp } = useStore();
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    if (!credentials) {
      return setUser(undefined);
    }

    swell.account
      .create(credentials)
      .then((account) => {
        updateStateProp('user', account);
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
  const { updateStateProp } = useStore();
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    if (!userDetails) {
      return setUser(undefined);
    }

    swell.account
      .update(userDetails)
      .then((account) => {
        setUser(account);
        updateStateProp('user', account);
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
  const { updateStateProp } = useStore();
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    if (!credentials) {
      return setUser(undefined);
    }

    const { email, password } = credentials;

    swell.account
      .login(email, password)
      .then((account) => {
        updateStateProp('user', account);
        setUser(account);
        notifySuccess(
          'Welcome! You are now logged in and can proceed to checkout or continue shopping'
        );
      })
      .catch(() => setUser(null));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  return { user };
};

/*****************************************************************************
 * Check if the user is logged in
 ****************************************************************************/
export const useUserLogged = () => {
  const { state, updateState } = useStore();
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    getUserData()
      .then(({ account, cart, listOrders, userCards }) => {
        updateState({
          ...state,
          user: account || {},
          localCart: cart,
          orders: listOrders,
          cards: userCards
        });
        setUser(account);
      })
      .catch(() => {
        updateState({ ...state, user: {}, localCart: {}, cards: {} });
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
  const listCards = swell.account.listCards();
  const [account, cart, listOrders, userCards] = await Promise.all([
    accountPromise,
    cartPromise,
    orderPromise,
    listCards
  ]);

  return { account, cart, listOrders, userCards };
};

/*****************************************************************************
 * Fetch user Orders
 ****************************************************************************/
const getUserOrders = async () => {
  const dataFromlistOrders = await swell.account.listOrders();
  const userOrders = dataFromlistOrders.results;
  return userOrders.map((order: Order) => {
    return {
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
    } as UserOrder;
  });
};

/*****************************************************************************
 * Logout current user and redirect to home page
 ****************************************************************************/
export const useLogout = () => {
  const { updateStateProp } = useStore();

  return async () => {
    await swell.account
      .logout()
      .then(() => {
        updateStateProp('user', {
          first_name: '',
          last_name: '',
          email: ''
        });

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
