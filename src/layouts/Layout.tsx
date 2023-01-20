import { ToastContainer } from 'react-toastify';

import Footer from '~/components/globals/Footer';
import Navbar from '~/components/globals/navbar/Navbar';

import { useUserLogged } from '~/hooks/useSwellAccount';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  useUserLogged();

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
      <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">{children}</div>
      <Footer />
    </>
  );
}
