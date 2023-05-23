'use client';

import { GrClose } from 'react-icons/gr';

import Button from '../globals/button/Button';

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
        <div className="p-8 font-quicksand rounded w-80 md:w-[500px]">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-medium text-3xl font-libre">Log out</h3>
            <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpenLogOut(false)} />
          </div>

          <p className="pb-6">Are you sure you want to log out?</p>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-8 mt-5">
            <Button label="NO" fullWidth type="submit" onClick={() => setOpenLogOut(false)} />
            <Button
              label="YES"
              fullWidth
              type="submit"
              variant="outlined"
              onClick={() => {
                void handleLogout();
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogOutModal;
