import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

import { Spinner } from '../globals/Spinner';

import Modal from '~/components/account/Modal';
import { updateAccount } from '~/hooks/useSwellAccount';
//import swell from 'swell-js';

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: { email: string };
};

const EditProfileModal = ({ open, setOpen, userInfo }: Props) => {
  const router = useRouter();

  console.log(userInfo);
  const [updateUser, setUpdateUser] = useState<Inputs | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Inputs>();
  //{ defaultValues: { ...userInfo } }
  const user = updateAccount(updateUser);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setUpdateUser(data);

    setOpen(false);
    // console.log(data);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      {console.log(errors)}
      <div className="bg-gray-200 p-6 rounded w-80 md:w-[500px]">
        <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
          <h3 className="font-medium text-3xl">Edit profile</h3>
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
          <label className="block text-sm mb-2" htmlFor="first_name">
            First name
          </label>
          <input
            className="w-full mb-4 p-2"
            id="first_name"
            type="text"
            // value={userInfo.first_name}
            {...register('first_name', {
              required: 'Please enter your first name.',
              maxLength: { value: 50, message: 'first name is too long.' }
            })}
          />
          {errors.first_name && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.first_name.message}</p>
          )}
          <label className="block text-sm mb-2" htmlFor="last_name">
            Last Name
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

          <label className="block text-sm mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            className="w-full mb-4 p-2"
            id="email"
            type="text"
            {...register('email', {
              required: 'Please enter your e-mail.',
              maxLength: { value: 50, message: 'e-mail is too long.' }
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.email.message}</p>
          )}
          <label className="block text-sm mb-2" htmlFor="password">
            <span className="text-red-500">*</span> Password
          </label>
          <input
            className="w-full mb-4 p-2"
            id="password"
            type="password"
            {...register('password', {
              required: 'Please enter your password.',
              minLength: { value: 6, message: 'Must include a minimum of 6 characters.' }
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.password.message}</p>
          )}
          {/* <label className="block text-sm mb-2" htmlFor="confirmPassword">
            <span className="text-red-500">*</span> Confirm password
          </label>
          <input
            className="w-full mb-4 p-2"
            id="confirmPassword"
            type="password"
            {...register(
              'confirmPassword'
              //  {
              //   required: 'Please enter your password.',
              //   minLength: { value: 6, message: 'Must include a minimum of 6 characters.' }
              // }
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.confirmPassword.message}</p>
          )} */}
          <button
            type="submit"
            className="w-full bg-secondary text-primary p-3 rounded mt-7 transition-all duration-300 hover:bg-primary hover:text-secondary"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
