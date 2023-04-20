import { useState } from 'react';

import DeleteAddressModal from './DeleteAddressModal';
import EditAddressModal from './EditAddressModal';

import EditIcon from 'public/img/icons/EditIcon';
import TrashIcon from 'public/img/icons/TrashIcon';
import Button from '~/components/globals/button/Button';

interface Props {
  address: SwellAddress;
}

const AddressCard = ({ address }: Props) => {
  const [open, setOpen] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);

  return (
    <div className="flex rounded bg-primary-lightest p-5 shadow-md border border-gray-50 justify-between mb-2">
      <div className="space-y-2">
        <p className="font-bold">
          {address.first_name} {address.last_name}
        </p>
        <p>{address.address1}</p>
        <p>
          {address.city} {address.zip}
        </p>
        <p>{address.country}</p>
      </div>
      <div className="flex flex-col justify-between">
        <button className="flex justify-center items-center pt-1" onClick={() => setOpen(true)}>
          <EditIcon />
        </button>
        <DeleteAddressModal
          addressId={address.id}
          openConfModal={openConfModal}
          setOpenConfModal={setOpenConfModal}
        />
        <button
          className="hover:stroke-red-500"
          onClick={() => {
            void setOpenConfModal(true);
          }}
        >
          <TrashIcon />
        </button>
        <EditAddressModal open={open} setOpen={setOpen} address={address} />
      </div>
    </div>
  );
};

export default AddressCard;
