'use client';

import { useState } from 'react';
import { MdPayment } from 'react-icons/md';

import PaymentsModal from './PaymentsModal';

import Button from '~/_components/Button';

export default function CreatePayment() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        classes="my-10 rounded"
        onClick={() => setOpen(true)}
        label={
          <div className="flex justify-center items-center space-x-2">
            <MdPayment />
            <span>ADD NEW PAYMENT METHOD</span>
          </div>
        }
      />
      <PaymentsModal open={open} setOpen={setOpen} />
    </>
  );
}
