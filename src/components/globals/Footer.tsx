import CTA from '~/components/globals/Footer/CTA';
import Copyright from '~/components/globals/Footer/Copyright';
import LinksAddress from '~/components/globals/Footer/LinksAddress';

export const Footer = () => {
  return (
    <div className="block bg-secondary bottom-0 w-full text-white">
      <CTA />
      <LinksAddress />
      <Copyright />
    </div>
  );
};
