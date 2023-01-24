import { useRouter } from 'next/router';

import { useUserLogged } from './useSwellAccount';

const allowedRoutes = ['/account/login', '/account/create-account'];

export const useAuth = () => {
  const router = useRouter();

  const { user } = useUserLogged();

  /*****************************************************************************
   * Check if current page is user protected
   ****************************************************************************/
  const isAccountPage =
    router.pathname.startsWith('/account') && !allowedRoutes.includes(router.pathname);

  /*****************************************************************************
   * Is the current page an anonymous page?
   * If so, redirect to orders if logged in
   ****************************************************************************/
  const isAnonPage = allowedRoutes.includes(router.pathname);

  /*****************************************************************************
   * Redirect if user is logged in and tries to access login page
   ****************************************************************************/
  if (isAnonPage && user) {
    console.log('REDIRECT TO ORDERS');
    void router.push('/account/orders');
  }

  /*****************************************************************************
   * Redirect if user is not logged in and tries to access protected pages
   ****************************************************************************/
  if (user === null && isAccountPage) {
    console.log('REDIRECT TO LOGIN');
    void router.push('/account/login');
  }

  return { user, isAccountPage, isAnonPage };
};
