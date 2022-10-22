import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import swell from 'swell-js';

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY);

/*****************************************************************************
 * Check if the user is logged in
 ****************************************************************************/
export const useIsLogged = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  // Check if the user is logged in
  useEffect(() => {
    swell.account
      .get()
      .then((logged) => {
        setIsLogged(logged ? true : false);
      })
      .catch(() => {
        setIsLogged(false);
      });
  }, []);

  // Redirect to login page if not logged in
  if (isLogged === false) {
    void router.push('/account/login');
  }

  return isLogged;
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
