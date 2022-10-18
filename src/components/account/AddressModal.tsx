import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

import Modal from '~/components/account/Modal';

export type Inputs = {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  zipCode: string;
  phone: string;
  isDefaultAddress: boolean;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddressModal = ({ open, setOpen }: Props) => {
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
      <div className="bg-gray-200 p-4 rounded w-full">
        <div className="flex items-center justify-between mb-4 w-full">
          <h3 className="font-medium text-3xl">Add new address</h3>{' '}
          <GrClose className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block font-light text-sm" htmlFor="firstName">
            First Name
          </label>
          <input
            className="w-full mb-4"
            id="firstName"
            type="text"
            {...register('firstName', {
              required: 'Please enter your first name.',
              maxLength: { value: 50, message: 'First name is too long.' }
            })}
          />
          {errors.firstName && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.firstName.message}</p>
          )}
          <label className="block font-light text-sm" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="w-full mb-4"
            id="lastName"
            type="text"
            {...register('lastName', {
              required: 'Please enter your last name.',
              maxLength: { value: 50, message: 'Last name is too long.' }
            })}
          />
          {errors.lastName && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.lastName.message}</p>
          )}
          <label className="block font-light text-sm" htmlFor="address">
            Address
          </label>
          <input
            className="w-full mb-4"
            id="address"
            type="text"
            {...register('address', {
              required: 'Please enter your address.',
              maxLength: { value: 50, message: 'Address is too long.' }
            })}
          />{' '}
          {errors.address && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.address.message}</p>
          )}
          <label className="block font-light text-sm" htmlFor="apartment">
            Apartment / Floor / Suite
          </label>
          <input
            className="w-full mb-4"
            id="apartment"
            type="text"
            {...register('apartment', {
              required: 'Please enter your apartment / floor / suite.',
              maxLength: { value: 50, message: 'Apartment / floor / suite is too long.' }
            })}
          />
          {errors.apartment && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.apartment.message}</p>
          )}
          <label className="block font-light text-sm" htmlFor="city">
            City
          </label>
          <input
            className="w-full mb-4"
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
              <label className="block font-light text-sm" htmlFor="country">
                Country
              </label>
              <select
                className="w-full py-[2px]"
                id="country"
                {...register('country', {
                  required: 'Please enter your country',
                  maxLength: { value: 50, message: 'Country is too long.' }
                })}
              >
                <option value="uruguay">Uruguay</option>
                <option value="argentina">Argentina</option>
                <option value="brasil">Brasil</option>
              </select>
              {errors.country && (
                <p className="text-red-600 text-xs -mt-4 mb-4">{errors.country.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block font-light text-sm" htmlFor="zipCode">
                Zip code
              </label>
              <input
                className="mb-4"
                id="zipCode"
                type="text"
                {...register('zipCode', {
                  required: 'Please enter your zip code',
                  maxLength: { value: 50, message: 'Zip code is too long.' }
                })}
              />
              {errors.zipCode && (
                <p className="text-red-600 text-xs -mt-4 mb-4">{errors.zipCode.message}</p>
              )}
            </div>
          </div>
          <label className="block font-light text-sm" htmlFor="phone">
            Phone
          </label>
          <input
            className="w-full mb-4"
            id="phone"
            type="number"
            {...register('phone', {
              required: 'Please enter your phone',
              maxLength: { value: 50, message: 'Phone is too long.' }
            })}
          />
          {errors.phone && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.phone.message}</p>
          )}
          <div className="flex items-center gap-4">
            <label className="block font-light text-sm" htmlFor="isDefaultAddress">
              Make this my default shipping address
            </label>
            <input
              className=""
              id="isDefaultAddress"
              type="checkbox"
              {...register('isDefaultAddress')}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-primary p-3 rounded mt-7 transition-all duration-300 hover:bg-primary hover:text-secondary"
          >
            CREATE ADDRESS
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddressModal;
