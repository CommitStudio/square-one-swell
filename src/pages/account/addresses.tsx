import { useState } from 'react';

import AccountLayout from '~/components/account/AccountLayout';
import AddressModal from '~/components/account/address/AddressModal';
import AddressesBody from '~/components/account/address/AddressesBody';

const Addresses = () => {
  const [open, setOpen] = useState(false);

  return (
    <AccountLayout>
      <AddressesBody setOpen={setOpen} />
      <AddressModal open={open} setOpen={setOpen} />
    </AccountLayout>
  );
};

export default Addresses;
