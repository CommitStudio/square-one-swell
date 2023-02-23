import { useState } from 'react';

import DeleteAddressModal from './DeleteAddressModal';
import EditAddressModal from './EditAddressModal';

interface Props {
  address: SwellAddress;
}

const AddressCard = ({ address }: Props) => {
  const [open, setOpen] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);

  return (
    <div className="flex rounded bg-primary-lightest p-5 shadow-md border border-gray-50 justify-between mb-2">
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
          className="bg-secondary text-primary p-2 rounded transition-all duration-100 hover:bg-primary hover:text-secondary"
          onClick={() => {
            void setOpenConfModal(true);
          }}
        >
          Delete
        </button>
        <DeleteAddressModal
          addressId={address.id}
          openConfModal={openConfModal}
          setOpenConfModal={setOpenConfModal}
        />
        <button
          className="bg-secondary text-primary p-2 rounded transition-all duration-100 hover:bg-primary hover:text-secondary"
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
