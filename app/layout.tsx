import NextTopLoader from 'nextjs-toploader';

import Footer from '~/_components/Globals/Footer';
import ToastLoader from '~/_components/Globals/ToastLoader';
import Navbar from '~/_components/Navbar';

import '~/styles/global.css';

export const metadata = {
  title: 'SquareOne',
  description: 'Storefront for Swell'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#1DD197" showSpinner={false} />
        <ToastLoader />
        <Navbar />
        <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
