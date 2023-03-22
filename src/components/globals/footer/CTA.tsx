import Button from '../button/Button';

import Tooltip from '~/components/globals/Tooltip';

const CTA = () => {
  return (
    <div className="w-full bg-white text-black flex flex-col space-y-3 md:space-y-0 md:flex-row justify-around p-5 py-12 items-center">
      <div className="text-xl leading-8">
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
    </div>
  );
};

export default CTA;
