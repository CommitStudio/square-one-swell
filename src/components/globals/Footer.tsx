import CTA from '~/components/globals/footer/CTA';
import Copyright from '~/components/globals/footer/Copyright';
import LinksAddress from '~/components/globals/footer/LinksAddress';

export default function Footer() {
  return (
    <footer className="block bg-secondary bottom-0 w-full text-white">
      <CTA />
      <LinksAddress />
      <Copyright />
    </footer>
  );
}
