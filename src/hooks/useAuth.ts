import { useRouter } from 'next/router';

import { useUserLogged } from './useSwellAccount';

const allowedRoutes = ['/account/login', '/account/create-account'];

export const useAuth = () => {
  const router = useRouter();

  const { user } = useUserLogged();

  const isAccountPage =
    router.pathname.startsWith('/account') && !allowedRoutes.includes(router.pathname);

  const isAnonPage = allowedRoutes.includes(router.pathname);

  if (isAnonPage && user) {
    console.log('REDIRECT TO ORDERS');
    void router.push('/account/orders');
  }

  if (user === null && isAccountPage) {
    console.log('REDIRECT TO LOGIN');
    void router.push('/account/login');
  }

  return { user, isAccountPage, isAnonPage };
};
