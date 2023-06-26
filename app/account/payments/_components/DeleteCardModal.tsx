import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';

import Modal from '~/_components/Account/Modal';
import Button from '~/_components/Button';
import { Spinner } from '~/_components/Globals/Spinner';

import swell from '~/_lib/SwellJS';

type Props = {
  openConfModal: boolean;
  setOpenConfModal: React.Dispatch<React.SetStateAction<boolean>>;
  cardId: string;
};

const DeleteCardModal = ({ openConfModal, setOpenConfModal, cardId }: Props) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteCard = async (id: string) => {
    setIsSubmitting(true);
    await swell.account.deleteCard(id);

    router.refresh();
    setOpenConfModal(false);
  };

  return (
    <>
      <Modal open={openConfModal} setOpen={setOpenConfModal}>
        <div className="p-6 rounded w-80 md:w-[500px] font-quicksand">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-medium text-3xl font-libre">Confirm action</h3>
            <GrClose
              className="cursor-pointer min-w-[16px]"
              onClick={() => setOpenConfModal(false)}
            />
          </div>
          <p className="pb-6">Are you sure you want to delete this payment method?</p>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <Button
              label="NO"
              fullWidth
              variant="outlined"
              onClick={() => setOpenConfModal(false)}
            />
            <Button
              label={isSubmitting ? <Spinner size={6} /> : 'YES'}
              fullWidth
              onClick={() => {
                handleDeleteCard(cardId).catch((err) => console.error(err));
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteCardModal;
