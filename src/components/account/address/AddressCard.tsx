import { useState } from 'react';
import swell from 'swell-js';

import EditAddressModal from './EditAddressModal';

import { useStore } from '~/hooks/useStore';
swell.init(process.env.PUBLIC_SWELL_STORE_ID, process.env.PUBLIC_SWELL_PUBLIC_KEY);

interface Props {
  address: SwellAddressResult;
}

const AddressCard = ({ address }: Props) => {
  const { updateStateProp } = useStore();
  const [open, setOpen] = useState(false);

  const handleDeleteAddress = async (id: string) => {
    await swell.account.deleteAddress(id);
    const allAddress = await swell.account.listAddresses();
    updateStateProp('addresses', allAddress);
  };

  return (
    <div className="flex rounded bg-primary-lightest p-4 shadow-md border border-gray-50 justify-between mb-2">
      <div className="space-y-2">
        <p>
          {address.first_name} {address.last_name}
        </p>
        <p>{address.address1}</p>
        <p>
          {address.city} {address.zip}
        </p>
        <p>{address.country}</p>
      </div>
      <div className="flex flex-col justify-between">
        <button
          className="bg-secondary text-primary p-1 rounded transition-all duration-300 hover:bg-primary hover:text-secondary"
          onClick={() => {
            void handleDeleteAddress(address.id);
          }}
        >
          Delete
        </button>
        <button
          className="bg-secondary text-primary p-1 rounded transition-all duration-300 hover:bg-primary hover:text-secondary"
          onClick={() => setOpen(true)}
        >
          Edit
        </button>
        <EditAddressModal open={open} setOpen={setOpen} address={address} />
      </div>
    </div>
  );
};

export default AddressCard;
