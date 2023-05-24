'use client';

import { useState } from 'react';

import AddressesBody from '~/components/account/address/AddressesBody';
import NewAddressModal from '~/components/account/address/NewAddressModal';

export default function AddressContainer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddressesBody setOpen={setOpen} />
      <NewAddressModal open={open} setOpen={setOpen} />
    </>
  );
}
