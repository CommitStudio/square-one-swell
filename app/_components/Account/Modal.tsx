'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const Modal = ({ open, setOpen, children }: Props) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[150] inset-0 grid place-content-center grid-cols-1 overflow-hidden"
        onClose={setOpen}
      >
        <div className="">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-70 lg:scale-90"
            enterTo="opacity-100 lg:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 lg:scale-100"
            leaveTo="opacity-0 lg:scale-90"
          >
            <div className="relative transform transition-all w-fit mx-auto bg-white flex justify-center rounded">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
