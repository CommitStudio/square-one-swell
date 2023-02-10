import { GrClose } from 'react-icons/gr';

import Modal from '../Modal';

import { useStore } from '~/hooks/useStore';

import { swell } from '~/hooks/useSwellConection';

type Props = {
  openConfModal: boolean;
  setOpenConfModal: React.Dispatch<React.SetStateAction<boolean>>;
  cardId: string;
};

const DeleteCardModal = ({ openConfModal, setOpenConfModal, cardId }: Props) => {
  const { updateStateProp } = useStore();

  const handleDeleteCard = async (id: string) => {
    await swell.account.deleteCard(id);
    const allCards = await swell.account.listCards();
    updateStateProp('cards', allCards);
  };

  return (
    <>
      <Modal open={openConfModal} setOpen={setOpenConfModal}>
        <div className="bg-gray-200 p-6 rounded w-80 md:w-[500px]">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-medium text-3xl">Confirm payment method</h3>
            <GrClose
              className="cursor-pointer min-w-[16px]"
              onClick={() => setOpenConfModal(false)}
            />
          </div>
          <p className="pb-6">Are you sure you want to delete this payment method?</p>
          <div className="flex flex-col md:flex-row">
            <button
              type="button"
              className="w-full bg-white text-secondary p-3 md:mr-4 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
              onClick={() => setOpenConfModal(false)}
            >
              NO
            </button>
            <button
              type="submit"
              className="w-full bg-white text-secondary border-2 border-secondary  p-3 rounded mt-5 md:mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
              onClick={() => {
                handleDeleteCard(cardId).catch((err) => console.error(err));
              }}
            >
              YES
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteCardModal;
