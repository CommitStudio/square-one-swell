import { useState } from 'react';

import AccountLayout from '~/components/account/AccountLayout';
import AddressesBody from '~/components/account/address/AddressesBody';
import NewAddressModal from '~/components/account/address/NewAddressModal';
import Head from '~/components/globals/Head';
import keywords from '~/data/keywords.json';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const Addresses = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head
        title="SquareOne - Addresses"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.home}
        url={`${NEXT_PUBLIC_BASE_URL}/`}
      />
      <AccountLayout>
        <AddressesBody setOpen={setOpen} />
        <NewAddressModal open={open} setOpen={setOpen} />
      </AccountLayout>
    </>
  );
};

export default Addresses;
