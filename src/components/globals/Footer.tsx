import CTA from './Footer/CTA';
import Copyright from './Footer/Copyright';
import LinksAddress from './Footer/LinksAddress';

export const Footer = () => {
  return (
    <div className="fixed bg-secondary bottom-0 w-full text-white">
      <CTA />
      <LinksAddress />
      <Copyright />
    </div>
  );
};
