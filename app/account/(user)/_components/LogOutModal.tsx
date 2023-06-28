'use client';

import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { HiOutlineLogout } from 'react-icons/hi';

import Modal from '~/_components/Account/Modal';
import Button from '~/_components/Button';

import swell from '~/_lib/SwellJS';
import { notifyFailure, notifySuccess } from '~/_utils/toastifies';

const LogOutModal = () => {
  const [openLogOut, setOpenLogOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    setIsSubmitting(true);
    await swell.account
      .logout()
      .then(() => {
        document.location.href = '/';
        setOpenLogOut(false);
      })
      .catch(() => notifyFailure('Something went wrong'))
      .finally(() => {
        notifySuccess(
          'You have been successfully logged out. Thank you for shopping with us. We hope to see you again soon!'
        );
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <button
        className="flex items-center gap-1 hover:text-red-600 mt-10"
        onClick={() => setOpenLogOut(true)}
      >
        <HiOutlineLogout />
        Log out
      </button>

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
              disabled={isSubmitting}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogOutModal;
