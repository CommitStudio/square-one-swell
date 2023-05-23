import Link from 'next/link';
import { BiShoppingBag } from 'react-icons/bi';

import AccountLayout from '~/components/account/AccountLayout';
import Head from '~/components/globals/Head';
import keywords from '~/data/keywords.json';
const { NEXT_PUBLIC_BASE_URL } = process.env;

const Subscriptions = () => {
  return <>
    <Head
      title="SquareOne - Subscriptions"
      description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
      keywords={keywords.home}
      url={`${NEXT_PUBLIC_BASE_URL}/`}
    />
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Subscriptions</h4>
      <p className="text-gray-400">You currently have no subscriptions.</p>
      <Link
        href="/products"
        className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary">

        <BiShoppingBag />START SHOPPING
      </Link>
    </AccountLayout>
  </>;
};

export default Subscriptions;
