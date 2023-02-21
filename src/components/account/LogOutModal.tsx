import { GrClose } from 'react-icons/gr';

import Modal from './Modal';

import { useLogout } from '~/hooks/useSwellAccount';

type Props = {
  openLogOut: boolean;
  setOpenLogOut: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogOutModal = ({ openLogOut, setOpenLogOut }: Props) => {
  const handleLogout = useLogout();

  return (
    <>
      <Modal open={openLogOut} setOpen={setOpenLogOut}>
        <div className="bg-gray-200 p-6 rounded w-80 md:w-[500px]">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-medium text-3xl">Log out</h3>
            <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpenLogOut(false)} />
          </div>

          <p className="pb-6">Are you sure you want to log out?</p>
          <div className="flex flex-col md:flex-row">
            <button
              type="button"
              className="w-full bg-white text-secondary p-3 md:mr-4 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
              onClick={() => setOpenLogOut(false)}
            >
              NO
            </button>
            <button
              type="submit"
              className="w-full bg-white text-secondary border-2 border-secondary  p-3 rounded mt-5 md:mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
              onClick={() => {
                void handleLogout();
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

export default LogOutModal;
