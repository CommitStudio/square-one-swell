'use client';

import { useState } from 'react';

import AddressesBody from './AddressesBody';

import NewAddressModal from './NewAddressModal';

type Props = {
  addresses: SwellAPI_Address[];
};

export default function AddressContainer({ addresses }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddressesBody addresses={addresses} setOpen={setOpen} />
      <NewAddressModal open={open} setOpen={setOpen} />
    </>
  );
}
