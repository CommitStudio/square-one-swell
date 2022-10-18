import { useState } from 'react';
import { FaRegAddressCard } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';

import AccountLayout from '~/components/account/AccountLayout';
import Modal from '~/components/account/Modal';

const Addresses = () => {
  const [open, setOpen] = useState(false);
  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Addresses</h4>
      <p className="text-gray-400">There are no addresses associated with this account.</p>

      <button
        className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
        onClick={() => setOpen(true)}
      >
        <FaRegAddressCard />
        ADD NEW ADDRESS
      </button>

      {/* MODAL STRUCTURE */}
      <Modal open={open} setOpen={setOpen}>
        <div className="bg-gray-200 p-4 rounded w-full">
          <div className="flex items-center justify-between mb-4 w-full">
            <h3 className="font-medium text-3xl">Add new address</h3>{' '}
            <GrClose className="cursor-pointer" onClick={() => setOpen(false)} />
          </div>
          <form className="" action="">
            <label className="block font-light text-sm" htmlFor="firstName">
              First Name
            </label>
            <input className="w-full mb-4" name="firstName" id="firstName" type="text" />
            <label className="block font-light text-sm" htmlFor="lastName">
              Last Name
            </label>
            <input className="w-full mb-4" name="lastName" id="lastName" type="text" />
            <label className="block font-light text-sm" htmlFor="address">
              Address
            </label>
            <input className="w-full mb-4" name="address" id="address" type="text" />
            <label className="block font-light text-sm" htmlFor="apartment">
              Apartment / Floor / Suite
            </label>
            <input className="w-full mb-4" name="apartment" id="apartment" type="text" />
            <label className="block font-light text-sm" htmlFor="city">
              City
            </label>
            <input className="w-full mb-4" name="city" id="city" type="text" />
            <div className="flex gap-4">
              <div className="w-full">
                <label className="block font-light text-sm" htmlFor="country">
                  Country
                </label>
                <select className="w-full py-[2px]" name="country" id="country">
                  <option value="uruguay">Uruguay</option>
                  <option value="argentina">Argentina</option>
                  <option value="brasil">Brasil</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block font-light text-sm" htmlFor="zipCode">
                  Zip code
                </label>
                <input className="mb-4" name="zipCode" id="zipCode" type="text" />
              </div>
            </div>
            <label className="block font-light text-sm" htmlFor="phone">
              Phone
            </label>
            <input className="w-full mb-4" name="phone" id="phone" type="text" />
            <div className="flex items-center gap-4">
              <label className="block font-light text-sm" htmlFor="isDefaultAddress">
                Make this my default shipping address
              </label>
              <input className="" name="isDefaultAddress" id="isDefaultAddress" type="checkbox" />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-primary p-3 rounded mt-7 transition-all duration-300 hover:bg-primary hover:text-secondary"
            >
              CREATE ADDRESS
            </button>
          </form>
        </div>
      </Modal>
    </AccountLayout>
  );
};

export default Addresses;
