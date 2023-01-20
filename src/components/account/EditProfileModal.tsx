import { useState, useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import 'react-toastify/dist/ReactToastify.css';

import type { AccountInformation } from 'swell-js';

import Modal from '~/components/account/Modal';

import { useStore } from '~/hooks/useStore';
import { useUpdateAccount } from '~/hooks/useSwellAccount';
import { notifySuccess } from '~/utils/toastifies';

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type Props = {
  openEdit: boolean;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfileModal = ({ openEdit, setOpenEdit }: Props) => {
  const { state } = useStore();
  const { user } = state as { user: AccountInformation };
  const { first_name, last_name, email } = user;

  const [updateUser, setUpdateUser] = useState<Inputs | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  });

  useUpdateAccount(updateUser);

  //Used to check if password and confirmPassword fields are the same
  const password = useRef({});
  password.current = watch('password');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    delete data?.confirmPassword; //Delete confirmPassword not required on the store
    setUpdateUser(data);
    setOpenEdit(false);
    notifySuccess('Update was successful'); //TODO: Improve notify when update is NOT successful
  };

  useEffect(() => {
    setValue('first_name', first_name);
    setValue('last_name', last_name);
    setValue('email', email);
  }, [email, first_name, last_name, setValue]);

  return (
    <>
      <Modal open={openEdit} setOpen={setOpenEdit}>
        <div className="bg-gray-200 p-6 rounded w-80 md:w-[500px]">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-medium text-3xl">Edit profile</h3>
            <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpenEdit(false)} />
          </div>
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
              className="w-full mb-8 p-2"
              id="first_name"
              type="text"
              placeholder={first_name}
              {...register('first_name', {
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
              className="w-full mb-8 p-2"
              id="last_name"
              type="text"
              placeholder={last_name}
              {...register('last_name', {
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
              className="w-full mb-8 p-2"
              id="email"
              type="text"
              placeholder={email}
              {...register('email', {
                maxLength: { value: 50, message: 'e-mail is too long.' }
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-xs -mt-4 mb-4">{errors.email.message}</p>
            )}
            <span className="block text-sm mb-2 ">New Password</span>
            <label className="text-xs mb-1 font-extralight" htmlFor="password">
              Password
            </label>
            <input
              className="w-full mb-8 p-2"
              id="password"
              type="password"
              placeholder="New password"
              {...register('password', {
                minLength: { value: 6, message: 'Must include a minimum of 6 characters.' }
              })}
            />

            {errors.password && (
              <p className="text-red-600 text-xs -mt-4 mb-4">{errors.password.message}</p>
            )}
            <label className="block text-xs mb-1 font-extralight" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              className="w-full mb-4 p-2"
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
              {...(password.current !== undefined && {
                ...register('confirmPassword', {
                  validate: (value) => value === password.current || 'Passwords must be the same'
                })
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs -mt-4 mb-4">{errors.confirmPassword.message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-secondary text-primary p-3 rounded mt-7 transition-all duration-300 hover:bg-primary hover:text-secondary"
            >
              SAVE CHANGES
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default EditProfileModal;
