import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

import Modal from '~/components/account/Modal';
import { Spinner } from '~/components/globals/Spinner';

import { useStore } from '~/hooks/useStore';
import { swell } from '~/hooks/useSwellConection';
import { notifyFailure, notifySuccess } from '~/utils/toastifies';

type Inputs = {
  firstName: string;
  lastName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  isDefaultCard: boolean;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentsModal = ({ open, setOpen }: Props) => {
  const { state, updateState } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const month = data.expirationDate.slice(5, 7);
    const year = data.expirationDate.slice(0, 4);
    setIsLoading(true); //Turn on spinner while waiting

    try {
      const cardToken = await swell.card.createToken({
        number: data.cardNumber,
        exp_month: month,
        exp_year: year,
        cvc: data.cvc
      });
      await swell.account.createCard(cardToken);
      const cards = await swell.account.listCards();
      updateState({ ...state, cards });
      notifySuccess('New payment method added');
      setOpen(false);
    } catch (e) {
      notifyFailure('Invalid payment method');
      console.error(e);
    } finally {
      //Turn off spinner
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-gray-200 p-6 rounded md:w-[500px]">
        <div className="flex items-center justify-between mb-2 gap-x-4 w-full">
          <h3 className="font-medium text-3xl">Add New Payment Method</h3>
          <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpen(false)} />
        </div>
        <span className="text-xs font-extralight">
          <span className="text-red-500">*</span> Indicates a required field
        </span>
        <form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(onSubmit)(e);
          }}
        >
          {/* first name and last name */}
          <div className="flex gap-5 justify-between">
            <div>
              <label className="text-sm" htmlFor="firstName">
                <span className="text-red-500">*</span> First name
              </label>
              <input
                className="w-full mb-4 p-2"
                id="firstName"
                type="text"
                {...register('firstName', {
                  required: 'Please enter your first name.',
                  maxLength: { value: 50, message: 'name is too long.' }
                })}
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs -mt-4 mb-4">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="lastName">
                <span className="text-red-500">*</span> Last name
              </label>
              <input
                className="w-full mb-4 p-2"
                id="lastName"
                type="text"
                {...register('lastName', {
                  required: 'Please enter your last name.',
                  maxLength: { value: 50, message: 'name is too long.' }
                })}
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs -mt-4 mb-4">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* card number */}
          <label className="block mb-2 text-sm" htmlFor="cardNumber">
            <span className="text-red-500">*</span> Card number
          </label>
          <input
            className="w-full mb-4 p-2"
            id="cardNumber"
            type="number"
            {...register('cardNumber', {
              required: 'Please enter your card number.',
              maxLength: { value: 16, message: 'number is too long. should be 16 max.' },
              minLength: { value: 16, message: 'number is too short. should be 16 min.' },
              validate: (val) => {
                return !swell.card.validateNumber(val) ? 'Invalid number' : true;
              }
            })}
          />
          {errors.cardNumber && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.cardNumber.message}</p>
          )}

          {/* expriation and cvc */}
          <div className="flex gap-5 justify-between">
            <div>
              <label className="block mb-2 text-sm" htmlFor="expirationDate">
                <span className="text-red-500">*</span> Expiration Date
              </label>
              <input
                className="w-full mb-4 p-2 -webkit-datetime-edit:text-red-500"
                id="expirationDate"
                type="month"
                min={dayjs().format('YYYY-MM').toString()}
                {...register('expirationDate', {
                  required: 'Please enter your card expiration date.'
                })}
              />
              {errors.expirationDate && (
                <p className="text-red-600 text-xs -mt-4 mb-4">{errors.expirationDate.message}</p>
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
                  maxLength: { value: 3, message: 'number is too long. 3 max.' }
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
            {!isLoading ? 'ADD NEW' : <Spinner size={6} />}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentsModal;
