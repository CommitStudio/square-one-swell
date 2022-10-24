import { useRouter } from 'next/router';
import swell from 'swell-js';
import useSWR from 'swr';

import type { AccountInformation } from 'swell-js';

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY);

/*****************************************************************************
 * Check if the user is logged in
 ****************************************************************************/
export const useUserLogged = () => {
  const { data, error } = useSWR<AccountInformation | null, Error>('swell.account.get', async () =>
    swell.account.get()
  );

  return { data, error };
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
