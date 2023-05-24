'use client';

import { useState } from 'react';

import AddressesBody from '~/components/account/address/AddressesBody';
import NewAddressModal from '~/components/account/address/NewAddressModal';

type Props = {
  addresses: SwellGraphQL_AddressObject[];
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
