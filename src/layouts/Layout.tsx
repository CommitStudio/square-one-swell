import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SkeletonPlaceholder from 'app/account/_components/SkeletonPlaceholder';
import Footer from '~/components/globals/Footer';
import Navbar from '~/components/globals/navbar/Navbar';

import { useAuth } from '~/hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { isReady, isLoading } = useAuth();

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
        {isLoading && <SkeletonPlaceholder />}
        {isReady && children}
      </div>
      <Footer />
    </>
  );
}
