'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import { TbEdit } from 'react-icons/tb';

import 'react-toastify/dist/ReactToastify.css';

import Modal from '~/_components/Account/Modal';
import Button from '~/_components/Button';

import swell from '~/_lib/SwellJS';
import { notifySuccess } from '~/_utils/toastifies';

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const EditProfileModal = ({ account }: { account: SwellAPI_Account }) => {
  const router = useRouter();

  const { firstName, lastName, email } = account || {};
  const [openEdit, setOpenEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  });

  // Used to check if password and confirmPassword fields are the same
  const password = useRef({});
  password.current = watch('password');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsSubmitting(true);
    delete data?.confirmPassword; // Delete confirmPassword not required on the store

    swell.account
      .update(data)
      .then(() => {
        setOpenEdit(false);
        router.refresh();
        notifySuccess('Your account information has been successfully updated.');
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    setValue('first_name', firstName || '');
    setValue('last_name', lastName || '');
    setValue('email', email || '');
  }, [email, firstName, lastName, setValue]);

  return (
    <>
      <button
        className="flex items-center gap-1 hover:text-red-600"
        onClick={() => setOpenEdit(true)}
      >
        <TbEdit />
        Edit profile
      </button>

      <Modal open={openEdit} setOpen={setOpenEdit}>
        <div className="bg-gray-200 p-10 rounded w-80 md:w-[500px] font-quicksand">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-medium text-3xl font-libre">Edit profile</h3>
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
              className="w-full mb-8 p-2 border"
              id="first_name"
              type="text"
              placeholder={firstName}
              {...register('first_name', {
                required: 'You must provide the first name!',
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
              className="w-full mb-8 p-2 border"
              id="last_name"
              type="text"
              placeholder={lastName}
              {...register('last_name', {
                required: 'You must provide the last name!',
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
              className="w-full mb-8 p-2 border"
              id="email"
              type="text"
              placeholder={email}
              {...register('email', {
                required: 'You must provide the e-mail address!',
                maxLength: { value: 50, message: 'e-mail is too long.' }
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-xs -mt-4 mb-4">{errors.email.message}</p>
            )}
            <span className="block text-sm mb-2 ">New Password</span>
            <input
              className="w-full mb-8 p-2 border"
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
            <label className="block text-sm mb-2" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              className="w-full mb-8 p-2 border"
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
            <Button fullWidth type="submit" label="SAVE CHANGES" disabled={isSubmitting} />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default EditProfileModal;
