import { FaRegAddressCard } from 'react-icons/fa';

import AddressCard from '~/components/account/address/AddressCard';
import data from '~/data/addresses.json';

const { addresses } = data;

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressesBody = ({ setOpen }: Props) => {
  return (
    <>
      <h4 className="text-3xl font-medium mb-5">Addresses</h4>
      <div className="grid gap-3 md:auto-rows-fr md:grid-cols-2 md:gap-8">
        {addresses.map((address) => {
          return <AddressCard key={address.id} address={address} />;
        })}
      </div>
      {!addresses && (
        <p className="text-gray-400">There are no addresses associated with this account.</p>
      )}
      <button
        className="inline-flex items-center gap-3 font-semibold bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
        onClick={() => setOpen(true)}
      >
        <FaRegAddressCard />
        ADD NEW ADDRESS
      </button>
    </>
  );
};

export default AddressesBody;
