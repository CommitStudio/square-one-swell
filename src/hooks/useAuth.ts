import { useRouter } from 'next/router';

import { useUserLogged } from './useSwellAccount';

const allowedRoutes = [
  '/account/login',
  '/account/create-account',
  '/account/forgot-password', //to ask for change password
  '/account/reset-password' //after the email password change was sent
];

export const useAuth = () => {
  const router = useRouter();

  const { user } = useUserLogged();

  /*****************************************************************************
   * Check if current page is user protected
   ****************************************************************************/
  const isAccountPage =
    router.pathname.startsWith('/account') && !allowedRoutes.includes(router.pathname);

  /*****************************************************************************
   * Check for unprotected account pages
   ****************************************************************************/
  const isAnonPage = allowedRoutes.includes(router.pathname);

  /*****************************************************************************
   * Determine if we should show the loading indicator
   ****************************************************************************/
  const isLoading = (isAccountPage && user === undefined) || (isAnonPage && user !== null);

  /*****************************************************************************
   * Determine if page is ready to render
   ****************************************************************************/
  const isReady =
    (isAccountPage && user) || (isAnonPage && user === null) || (!isAccountPage && !isAnonPage);

  /*****************************************************************************
   * Redirect if user is logged in and tries to access login page
   ****************************************************************************/
  if (isAnonPage && user) {
    void router.push('/account/orders');
  }

  /*****************************************************************************
   * Redirect if user is not logged in and tries to access protected pages
   ****************************************************************************/
  if (user === null && isAccountPage) {
    void router.push('/account/login');
  }

  return { isReady, isLoading };
};
