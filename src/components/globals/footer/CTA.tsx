import Button from '../button/Button';

import Tooltip from '~/components/globals/Tooltip';
import Container from '~/layouts/Container';

const CTA = () => {
  return (
    <div className="w-full bg-white text-black space-y-3 md:space-y-0 md:flex-row justify-around items-center">
      <Container className="w-full flex flex-col gap-6 md:flex-row justify-between items-center py-14 md:py-24">
        <div className="leading-6">
          <p className="font-bold">Sign up for our Newsletter</p>
          <span>Get top deals, latest trends, and more.</span>
        </div>
        <div className="flex">
          <input
            type="text"
            className="w-full border focus:outline-0 md:w-[350px] border-black border-r-0 rounded-l-lg p-2 pl-4"
            placeholder="Your email"
          />
          <Tooltip content="Feature coming soon!">
            <Button label="SUBSCRIBE" color="black" classes="rounded-r-lg" />
          </Tooltip>
        </div>
      </Container>
    </div>
  );
};

export default CTA;
