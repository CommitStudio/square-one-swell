import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

import Modal from '~/_components/Account/Modal';
import Button from '~/_components/Button';
import { Spinner } from '~/_components/Globals/Spinner';

import countriesJSON from '~/_data/countries.json';
import swell from '~/_lib/SwellJS';
import { notifyFailure, notifySuccess } from '~/_utils/toastifies';

const { countries } = countriesJSON;

type Inputs = {
  first_name: string;
  last_name: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  zip: string;
  phone: string;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewAddressModal = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const fullName = `${data.first_name} ${data.last_name}`;
    setIsSubmitting(true);
    await swell.account
      .createAddress({
        name: fullName,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        zip: data.zip,
        country: data.country,
        phone: data.phone
      })
      .then(() => {
        notifySuccess('Your new address was added');
        setOpen(false);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(error), notifyFailure('Something went wrong. Please try again');
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    router.refresh();
    setOpen(false);
    reset();
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-gray-200 p-6 rounded w-full">
        <div className="flex items-center justify-between mb-4 w-full">
          <h3 className="font-medium font-libre text-3xl">Add new address</h3>{' '}
          <GrClose data-cy="close-icon" className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>
        <span className="text-xs font-extralight">
          <span className="text-red-500">*</span> Indicates a required field
        </span>
        <form
          className="overflow-y-auto max-h-[80vh] mt-3"
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <label className="block text-sm mb-2" htmlFor="firstName">
            <span className="text-red-500">*</span> First Name
          </label>
          <input
            className="w-full mb-4 p-2 border"
            id="first_name"
            type="text"
            {...register('first_name', {
              required: 'Please enter your first name.',
              maxLength: { value: 50, message: 'First name is too long.' }
            })}
          />
          {errors.first_name && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.first_name.message}</p>
          )}
          <label className="block text-sm mb-2" htmlFor="lastName">
            <span className="text-red-500">*</span> Last Name
          </label>
          <input
            className="w-full mb-4 p-2 border"
            id="last_name"
            type="text"
            {...register('last_name', {
              required: 'Please enter your last name.',
              maxLength: { value: 50, message: 'Last name is too long.' }
            })}
          />
          {errors.last_name && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.last_name.message}</p>
          )}
          <label className="block text-sm mb-2" htmlFor="address">
            <span className="text-red-500">*</span> Address
          </label>
          <input
            className="w-full mb-4 p-2 border"
            id="address1"
            type="text"
            {...register('address1', {
              required: 'Please enter your address.',
              maxLength: { value: 50, message: 'Address is too long.' }
            })}
          />{' '}
          {errors.address1 && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.address1.message}</p>
          )}
          <label className="block text-sm mb-2" htmlFor="apartment">
            Apartment / Floor / Suite
          </label>
          <input
            className="w-full mb-4 p-2 border"
            id="address2"
            type="text"
            {...register('address2', {
              maxLength: { value: 50, message: 'Apartment / floor / suite is too long.' }
            })}
          />
          {errors.address2 && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.address2.message}</p>
          )}
          <label className="block text-sm mb-2" htmlFor="city">
            <span className="text-red-500">*</span> City
          </label>
          <input
            className="w-full mb-4 p-2 border"
            id="city"
            type="text"
            {...register('city', {
              required: 'Please enter your city',
              maxLength: { value: 50, message: 'City is too long.' }
            })}
          />
          {errors.city && <p className="text-red-600 text-xs -mt-4 mb-4">{errors.city.message}</p>}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm mb-2" htmlFor="country">
                Country
              </label>
              <select
                className="w-full p-[0.6rem] mb-4 border"
                id="country"
                {...register('country', {
                  required: 'Please enter your country',
                  validate: (value) => {
                    return value === '--' ? 'Please select a country' : true;
                  },
                  maxLength: { value: 50, message: 'Country is too long.' }
                })}
              >
                {countries.map((country, i) => (
                  <option
                    key={i}
                    value={`${country.alpha2Code}`}
                    hidden={country.name === 'Select a country'}
                  >
                    {`${country.name}`}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-600 text-xs -mt-4 mb-4">{errors.country.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm mb-2" htmlFor="zipCode">
                <span className="text-red-500">*</span> Zip code
              </label>
              <input
                className="mb-4 p-2 border"
                id="zip"
                type="text"
                {...register('zip', {
                  required: 'Please enter your zip code',
                  maxLength: { value: 50, message: 'Zip code is too long.' }
                })}
              />
              {errors.zip && (
                <p className="text-red-600 text-xs -mt-4 mb-4">{errors.zip.message}</p>
              )}
            </div>
          </div>
          <label className="block text-sm mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="w-full mb-4 p-2 border"
            id="phone"
            type="number"
            {...register('phone', {
              maxLength: { value: 50, message: 'Phone is too long.' }
            })}
          />
          {errors.phone && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.phone.message}</p>
          )}
          <Button
            type="submit"
            fullWidth
            label={!isSubmitting ? 'CREATE ADDRESS' : <Spinner size={5} />}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </Modal>
  );
};

export default NewAddressModal;
