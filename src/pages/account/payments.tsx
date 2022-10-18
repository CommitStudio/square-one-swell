import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import { MdPayment } from 'react-icons/md';

import AccountLayout from '~/components/account/AccountLayout';
import Modal from '~/components/account/Modal';

export type Inputs = {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  isDefaultCard: boolean;
};

const Payments = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Payment methods</h4>
      <p className="text-gray-400">There are no payment methods associated with this account.</p>

      <button
        className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
        onClick={() => setOpen(true)}
      >
        <MdPayment />
        ADD NEW PAYMENT METHOD
      </button>

      {/* MODAL STRUCTURE */}
      <Modal open={open} setOpen={setOpen}>
        <div className="bg-gray-200 p-4 rounded">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-medium text-3xl">Add new payment method</h3>
            <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpen(false)} />
          </div>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="block font-light text-sm" htmlFor="cardNumber">
              Card number
            </label>
            <input
              className="w-full mb-4"
              id="cardNumber"
              type="text"
              {...register('cardNumber', {
                required: 'Please enter your card number.',
                maxLength: { value: 50, message: 'number is too long.' }
              })}
            />
            {errors.cardNumber && (
              <p className="text-red-600 text-xs -mt-4 mb-4">{errors.cardNumber.message}</p>
            )}
            <div className="flex gap-5 justify-between">
              <div>
                <label className="block font-light text-sm" htmlFor="expiryDate">
                  Card expiry
                </label>
                <input
                  className="w-full mb-4"
                  id="expiryDate"
                  type="date"
                  {...register('expiryDate', {
                    required: 'Please enter your card expiry date.'
                  })}
                />
                {errors.expiryDate && (
                  <p className="text-red-600 text-xs -mt-4 mb-4">{errors.expiryDate.message}</p>
                )}
              </div>
              <div>
                <label className="block font-light text-sm" htmlFor="cvc">
                  CVC
                </label>
                <input
                  className="w-full mb-4"
                  id="cvc"
                  type="number"
                  {...register('cvc', {
                    required: 'Please enter your cvc number.',
                    maxLength: { value: 10, message: 'number is too long.' }
                  })}
                />
                {errors.cvc && (
                  <p className="text-red-600 text-xs -mt-4 mb-4">{errors.cvc.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="block font-light text-sm" htmlFor="isDefaultCard">
                Use as default card
              </label>
              <input
                className=""
                id="isDefaultCard"
                type="checkbox"
                {...register('isDefaultCard')}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-primary p-3 rounded mt-7 transition-all duration-300 hover:bg-primary hover:text-secondary"
            >
              ADD NEW PAYMENT METHOD
            </button>
          </form>
        </div>
      </Modal>
    </AccountLayout>
  );
};

export default Payments;
