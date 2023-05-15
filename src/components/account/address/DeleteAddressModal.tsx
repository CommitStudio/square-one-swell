import { useState } from 'react';
import { GrClose } from 'react-icons/gr';

import Modal from '~/components/account/Modal';
import { Spinner } from '~/components/globals/Spinner';
import Button from '~/components/globals/button/Button';

import { useGlobalState } from '~/hooks/useStore';
import swell from '~/lib/SwellJS';

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  addressId: string;
};

const DeleteAddressModal = ({ openModal, setOpenModal, addressId }: Props) => {
  const { setAddresses } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAddress = async (id: string) => {
    setIsLoading(true);
    await swell.account.deleteAddress(id);
    const allAddress = await swell.account.listAddresses();
    setAddresses(allAddress.results);
    setOpenModal(false);
  };

  return (
    <>
      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="p-10 rounded w-80 md:w-[500px]">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-libre text-2xl md:text-3xl">Confirm action</h3>
            <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpenModal(false)} />
          </div>
          <p className="pb-6 font-quicksand">Are you sure you want to delete this address?</p>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <Button label="NO" fullWidth onClick={() => setOpenModal(false)} />
            <Button
              label={isLoading ? <Spinner size={6} /> : 'YES'}
              variant="outlined"
              type="submit"
              fullWidth
              onClick={() => {
                handleDeleteAddress(addressId).catch((err) => console.error(err));
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAddressModal;
