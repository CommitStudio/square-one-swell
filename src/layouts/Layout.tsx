import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '~/components/globals/Footer';
import Navbar from '~/components/globals/navbar/Navbar';

import { useUserLogged } from '~/hooks/useSwellAccount';

type Props = {
  children: React.ReactNode;
};

const allowedRoutes = ['/account/login', '/account/create-account'];

const isRestrictedPage = (pathname: string) => {
  if (pathname.startsWith('/account') && !allowedRoutes.includes(pathname)) {
    return true;
  }

  return false;
};

export default function Layout({ children }: Props) {
  const router = useRouter();

  const { user } = useUserLogged();

  if (allowedRoutes.includes(router.pathname) && user) {
    console.log('REDIRECT TO ORDERS');
    void router.push('/account/orders');
    return null;
  }

  if (
    user === null &&
    router.pathname.startsWith('/account') &&
    !allowedRoutes.includes(router.pathname)
  ) {
    console.log('REDIRECT TO LOGIN');
    void router.push('/account/login');
    return null;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar
        newestOnTop
        draggable
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">
        {isRestrictedPage(router.pathname) && user === undefined && <div>LOADING ...</div>}
        {isRestrictedPage(router.pathname) && user && children}
        {!isRestrictedPage(router.pathname) && children}
      </div>
      <Footer />
    </>
  );
}
