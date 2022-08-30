import Footer from '~/components/globals/Footer';
import Navbar from '~/components/globals/navbar/Navbar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
