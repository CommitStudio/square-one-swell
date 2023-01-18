import { useRouter } from 'next/router';
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
  const { updateStateProp } = useStore();
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    swell.account
      .get()
      .then((account) => {
        updateStateProp('user', account);
        setUser(account);
      })
      .catch(() => setUser(null));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user };
};

/*****************************************************************************
 * Logout current user and redirect to home page
 ****************************************************************************/
export const useLogout = () => {
  const router = useRouter();
  const { updateStateProp } = useStore();
  console.log('useLogout');
  return async () => {
    await swell.account
      .logout()
      .then(() => {
        updateStateProp('user', {
          first_name: '',
          last_name: '',
          email: ''
        });
        router.push('/').catch(() => null);
      })
      .catch(() => notifyFailure('Something went wrong'))
      .finally(() => notifySuccess("You've been logged out"));
  };
};
