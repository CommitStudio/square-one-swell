import { useRouter } from 'next/navigation';
import { useReducer, useState } from 'react';
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
  address: SwellAddress;
};

const EditAddressModal = ({ open, setOpen, address }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const initialAddress = {
    active: address.active,
    address1: address.address1,
    address2: address.address2 || null,
    city: address.city,
    country: address.country,
    date_created: address.date_created,
    fingerprint: address.fingerprint,
    first_name: address.first_name,
    id: address.id,
    last_name: address.last_name,
    name: address.name,
    parent_id: address.parent_id,
    phone: address.phone || null,
    zip: address.zip || null
  };

  const reducer = (data: SwellAddress, action: { type: string; value: SwellAddress }) => {
    switch (action.type) {
      case 'updateAddress':
        setIsSubmitting(true);
        swell.account
          .updateAddress(address.id, action.value)
          .then(() => {
            notifySuccess('Address updated successfully');
            setOpen(false);
            setIsSubmitting(false);
          })
          .catch((err) => {
            console.error(err);
            notifyFailure('Something went wrong. Please try again');
          });
        router.refresh();

        break;
      case 'updateInputOnChange':
        return action.value;
      default:
        throw new Error("That action doesn't exist");
    }
    return data;
  };
  const [data, dispatch] = useReducer(reducer, initialAddress);

  const onSubmit: SubmitHandler<Inputs> = () => {
    const fullName = `${data.first_name} ${data.last_name}`;
    dispatch({ type: 'updateAddress', value: { ...data, name: fullName } });
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-gray-200 p-10 rounded w-full">
        <div className="flex items-center justify-between mb-4 w-full">
          <h3 className="font-medium text-3xl font-libre">Edit address</h3>
          <GrClose className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>
        <span className="text-xs font-extralight">
          <span className="text-red-500">*</span> Indicates a required field
        </span>
        <form
          className="overflow-y-auto max-h-[80vh] mt-3"
          onSubmit={(e) => {
            e.preventDefault();
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
            value={data.first_name}
            {...register('first_name', {
              required: 'Please enter your first name.',
              maxLength: { value: 50, message: 'First name is too long.' },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: 'updateInputOnChange',
                  value: { ...data, first_name: e.target.value }
                });
              }
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
            value={data.last_name}
            {...register('last_name', {
              required: 'Please enter your last name.',
              maxLength: { value: 50, message: 'Last name is too long.' },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: 'updateInputOnChange',
                  value: { ...data, last_name: e.target.value }
                });
              }
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
            value={data.address1}
            {...register('address1', {
              required: 'Please enter your address.',
              maxLength: { value: 50, message: 'Address is too long.' },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: 'updateInputOnChange',
                  value: { ...data, address1: e.target.value }
                });
              }
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
            value={data.address2 || ''}
            {...register('address2', {
              maxLength: { value: 50, message: 'Apartment / floor / suite is too long.' },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: 'updateInputOnChange',
                  value: { ...data, address2: e.target.value }
                });
              }
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
            value={data.city}
            {...register('city', {
              required: 'Please enter your city',
              maxLength: { value: 50, message: 'City is too long.' },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: 'updateInputOnChange',
                  value: { ...data, city: e.target.value }
                });
              }
            })}
          />
          {errors.city && <p className="text-red-600 text-xs -mt-4 mb-4">{errors.city.message}</p>}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm mb-2" htmlFor="country">
                Country
              </label>
              <select
                className="w-full py-2 border"
                id="country"
                value={data.country}
                {...register('country', {
                  required: 'Please enter your country',
                  maxLength: { value: 50, message: 'Country is too long.' },
                  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch({
                      type: 'updateInputOnChange',
                      value: { ...data, country: e.target.value }
                    });
                  }
                })}
              >
                {countries.map((country, i) => (
                  <option key={i} value={`${country.alpha2Code}`}>
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
                value={data.zip || ''}
                {...register('zip', {
                  required: 'Please enter your zip code',
                  maxLength: { value: 50, message: 'Zip code is too long.' },
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch({
                      type: 'updateInputOnChange',
                      value: { ...data, zip: e.target.value }
                    });
                  }
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
            className="w-full mb-2 p-2 border"
            id="phone"
            type="number"
            value={data.phone || ''}
            {...register('phone', {
              maxLength: { value: 50, message: 'Phone is too long.' },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: 'updateInputOnChange',
                  value: { ...data, phone: e.target.value }
                });
              }
            })}
          />
          {errors.phone && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.phone.message}</p>
          )}
          <Button
            label={!isSubmitting ? 'SAVE CHANGES' : <Spinner size={5} />}
            classes="mt-5"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </Modal>
  );
};

export default EditAddressModal;
