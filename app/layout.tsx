import ToastContainer from '~/components/ToastContainer';
import SkeletonPlaceholder from '~/components/account/SkeletonPlaceholder';
import Footer from '~/components/globals/Footer';
import Navbar from '~/components/globals/navbar/Navbar';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Navbar />
        <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">
          HELLO WORLD
          {/* {isLoading && <SkeletonPlaceholder />}
        {isReady && children} */}
        </div>
        <Footer />
      </body>
    </html>
  );
}
