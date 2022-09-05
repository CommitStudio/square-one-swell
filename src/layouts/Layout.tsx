import Footer from '~/components/globals/Footer';
import Navbar from '~/components/globals/navbar/Navbar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">{children}</div>
      <Footer />
    </>
  );
}
