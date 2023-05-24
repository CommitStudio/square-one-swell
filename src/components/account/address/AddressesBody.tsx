import { FaRegAddressCard } from 'react-icons/fa';

import AddressCard from '~/components/account/address/AddressCard';
import Button from '~/components/globals/button/Button';

interface Props {
  addresses: SwellGraphQL_AddressObject[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressesBody = ({ addresses, setOpen }: Props) => {
  return (
    <>
      <h4 className="text-3xl font-medium mb-5 font-libre">Addresses</h4>
      <div className="grid gap-3 md:auto-rows-fr md:grid-cols-2 md:gap-8">
        {addresses?.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>

      {addresses.length === 0 && (
        <p className="text-gray-400">There are no addresses associated with this account.</p>
      )}

      <Button
        onClick={() => setOpen(true)}
        classes="rounded mt-5"
        label={
          <div className="flex items-center justify-center space-x-2">
            <FaRegAddressCard />
            <span>ADD NEW ADDRESS</span>
          </div>
        }
      />
    </>
  );
};

export default AddressesBody;
