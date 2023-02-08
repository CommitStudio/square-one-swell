import { useState } from 'react';

import AccountLayout from '~/components/account/AccountLayout';
import AddressesBody from '~/components/account/address/AddressesBody';
import NewAddressModal from '~/components/account/address/NewAddressModal';

const Addresses = () => {
  const [open, setOpen] = useState(false);

  return (
    <AccountLayout>
      <AddressesBody setOpen={setOpen} />
      <NewAddressModal open={open} setOpen={setOpen} />
    </AccountLayout>
  );
};

export default Addresses;
