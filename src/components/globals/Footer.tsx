import CTA from '~/components/globals/Footer/CTA';
import Copyright from '~/components/globals/Footer/Copyright';
import LinksAddress from '~/components/globals/Footer/LinksAddress';

export default function Footer() {
  return (
    <footer className="block bg-secondary bottom-0 w-full text-white">
      <CTA />
      <LinksAddress />
      <Copyright />
    </footer>
  );
}
