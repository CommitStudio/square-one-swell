import { useRouter } from 'next/router';

import { useUserLogged } from './useSwellAccount';

const allowedRoutes = ['/account/login', '/account/create-account'];

export const useAuth = () => {
  const router = useRouter();

  const { user } = useUserLogged();

  const isAccountPage = () => {
    if (router.pathname.startsWith('/account') && !allowedRoutes.includes(router.pathname)) {
      return true;
    }

    return false;
  };

  if (allowedRoutes.includes(router.pathname) && user) {
    console.log('REDIRECT TO ORDERS');
    void router.push('/account/orders');
  }

  if (
    user === null &&
    router.pathname.startsWith('/account') &&
    !allowedRoutes.includes(router.pathname)
  ) {
    console.log('REDIRECT TO LOGIN');
    void router.push('/account/login');
  }

  return { user, isAccountPage };
};
