import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

import swell from 'swell-js';

import Modal from '~/components/account/Modal';
import countriesJSON from '~/data/countries.json';
import { useStore } from '~/hooks/useStore';

swell.init(process.env.PUBLIC_SWELL_STORE_ID, process.env.PUBLIC_SWELL_PUBLIC_KEY);

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
  const { updateStateProp } = useStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const fullName = `${data.first_name} ${data.last_name}`;
    await swell.account.createAddress({
      name: fullName,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      zip: data.zip,
      country: data.country,
      phone: data.phone
    });
    const allAddress = await swell.account.listAddresses();
    updateStateProp('addresses', allAddress);
    setOpen(false);
    reset();
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-gray-200 p-6 rounded w-full">
        <div className="flex items-center justify-between mb-4 w-full">
          <h3 className="font-medium text-3xl">Add new address</h3>{' '}
          <GrClose className="cursor-pointer" onClick={() => setOpen(false)} />
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
            className="w-full mb-4 p-2"
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
            className="w-full mb-4 p-2"
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
            className="w-full mb-4 p-2"
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
            className="w-full mb-4 p-2"
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
            className="w-full mb-4 p-2"
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
                className="w-full py-2"
                id="country"
                {...register('country', {
                  required: 'Please enter your country',
                  maxLength: { value: 50, message: 'Country is too long.' }
                })}
              >
                {countries.map((country, i) =>
                  country.name === '------' ? (
                    <option value="------" disabled key="------">
                      ------
                    </option>
                  ) : (
                    <option key={i} value={`${country.alpha2Code}`}>
                      {`${country.name}`}
                    </option>
                  )
                )}
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
                className="mb-4 p-2"
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
            className="w-full mb-4 p-2"
            id="phone"
            type="number"
            {...register('phone', {
              maxLength: { value: 50, message: 'Phone is too long.' }
            })}
          />
          {errors.phone && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.phone.message}</p>
          )}
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

export default NewAddressModal;
