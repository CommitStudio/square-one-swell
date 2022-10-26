import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

import Modal from '~/components/account/Modal';

type Inputs = {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  isDefaultCard: boolean;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentsModal = ({ open, setOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-gray-200 p-6 rounded md:w-[500px]">
        <div className="flex items-center justify-between mb-2 gap-x-4 w-full">
          <h3 className="font-medium text-3xl">Add new payment method</h3>
          <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpen(false)} />
        </div>
        <span className="text-xs font-extralight">
          <span className="text-red-500">*</span> Indicates a required field
        </span>
        <form
          className="mt-3"
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <label className="block text-sm" htmlFor="cardName">
            <span className="text-red-500">*</span> Name on card
          </label>
          <input
            className="w-full mb-4 p-2"
            id="cardName"
            type="text"
            {...register('cardName', {
              required: 'Please enter your card name.',
              maxLength: { value: 50, message: 'name is too long.' }
            })}
          />
          {errors.cardNumber && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.cardName?.message}</p>
          )}
          <label className="block mb-2 text-sm" htmlFor="cardNumber">
            <span className="text-red-500">*</span> Card number
          </label>
          <input
            className="w-full mb-4 p-2"
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
              <label className="block mb-2 text-sm" htmlFor="expiryDate">
                <span className="text-red-500">*</span> Card expiry
              </label>
              <input
                className="w-full mb-4 p-2"
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
              <label className="block mb-2 text-sm" htmlFor="cvc">
                <span className="text-red-500">*</span> CVC
              </label>
              <input
                className="w-full mb-4 p-2"
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
            <label className="block text-sm" htmlFor="isDefaultCard">
              Use as default card
            </label>
            <input className="" id="isDefaultCard" type="checkbox" {...register('isDefaultCard')} />
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
  );
};

export default PaymentsModal;
