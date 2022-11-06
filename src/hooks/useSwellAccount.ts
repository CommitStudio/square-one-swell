import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import swell from 'swell-js';

import type { AccountInformation } from 'swell-js';

swell.init(process.env.PUBLIC_SWELL_STORE_ID, process.env.PUBLIC_SWELL_PUBLIC_KEY);

/*****************************************************************************
 * Login user and return account information
 ****************************************************************************/
export const useLogin = (credentials: { email: string; password: string } | null) => {
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    if (!credentials) {
      return setUser(undefined);
    }

    const { email, password } = credentials;

    swell.account
      .login(email, password)
      .then((account) => setUser(account))
      .catch(() => setUser(null));
  }, [credentials]);

  return { user };
};

/*****************************************************************************
 * Check if the user is logged in
 ****************************************************************************/
export const useUserLogged = () => {
  const [user, setUser] = useState<AccountInformation | null | undefined>(undefined);

  useEffect(() => {
    swell.account
      .get()
      .then((account) => setUser(account))
      .catch(() => setUser(null));
  }, []);

  return { data: user };
};

/*****************************************************************************
 * Logout current user and redirect to home page
 ****************************************************************************/
export const useLogout = () => {
  const router = useRouter();

  return async () => {
    await swell.account.logout();
    router.push('/').catch(() => null);
  };
};
