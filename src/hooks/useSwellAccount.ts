import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import swell from 'swell-js';
import useSWR from 'swr';

import type { AccountInformation } from 'swell-js';

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY);

/*****************************************************************************
 * Login user and return account information
 ****************************************************************************/
export const useLogin = (credentials: { email: string; password: string } | null) => {
  const { data, error } = useSWR<unknown, Error>(
    credentials,
    async ({ email, password }: { email: string; password: string }) =>
      swell.account.login(email, password),
    { revalidateOnFocus: false }
  );

  return { data, error };
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
