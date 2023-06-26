import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

import Modal from '~/_components/Account/Modal';
import Button from '~/_components/Button';
import { Spinner } from '~/_components/Globals/Spinner';

import swell from '~/_lib/SwellJS';
import { notifyFailure, notifySuccess } from '~/_utils/toastifies';

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
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const month = data.expirationDate.slice(5, 7);
    const year = data.expirationDate.slice(0, 4);
    setIsSubmitting(true); //Turn on spinner while waiting

    try {
      const cardToken = await swell.card.createToken({
        number: data.cardNumber,
        exp_month: month,
        exp_year: year,
        cvc: data.cvc
      });

      const { id } = (await swell.account.createCard(cardToken)) as { id: string };

      if (data.isDefaultCard) {
        await swell.account.update({
          billing: { account_card_id: id }
        });
      }

      router.refresh();
      notifySuccess('New payment method added');
      setOpen(false);
    } catch (e) {
      notifyFailure('Invalid payment method');
      console.error(e);
    } finally {
      //Turn off spinner
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="py-10 px-6 rounded md:w-[500px]">
        <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
          <h3 className="font-medium text-2xl font-libre">Add New Payment Method</h3>
          <GrClose
            data-cy="close-icon"
            className="cursor-pointer min-w-[16px]"
            onClick={() => setOpen(false)}
          />
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
          <div className="flex gap-5 justify-between mb-6">
            <div>
              <label className="text-sm" htmlFor="firstName">
                <span className="text-red-500">*</span> First name
              </label>
              <input
                className="w-full p-2 border"
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
                className="w-full p-2 border"
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
            className="w-full mb-6 p-2 border"
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
          <div className="flex gap-5 justify-between mb-3">
            <div>
              <label className="block mb-2 text-sm capitalize" htmlFor="expirationDate">
                <span className="text-red-500">*</span> Expiration Date
              </label>
              <input
                className="w-full p-2 border -webkit-datetime-edit:text-red-500"
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
                className="w-full p-2 border"
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
          <div className="flex items-center gap-4 mb-3">
            <label className="block text-sm" htmlFor="isDefaultCard">
              Use as default card
            </label>
            <input id="isDefaultCard" type="checkbox" {...register('isDefaultCard')} />
          </div>
          <Button
            classes="mt-4"
            label={!isSubmitting ? 'ADD NEW' : <Spinner size={5} />}
            fullWidth
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </Modal>
  );
};

export default PaymentsModal;
