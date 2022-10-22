import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import swell from 'swell-js';

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY);

export const useSwellAccount = () => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    swell.account
      .get()
      .then((logged) => {
        logged?.id ? setIsLogged(true) : setIsLogged(false);
      })
      .catch(() => {
        setIsLogged(false);
      });
  }, []);

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
