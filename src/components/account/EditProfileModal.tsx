import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Modal from '~/components/account/Modal';
import { useStore } from '~/hooks/useStore';
import { useUpdateAccount } from '~/hooks/useSwellAccount';
//import swell from 'swell-js';

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  //confirmPassword: string;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: { first_name: string; last_name: string; email: string; password?: string };
};

const EditProfileModal = ({ open, setOpen, userInfo }: Props) => {
  //const router = useRouter();

  const { updateStateProp, state } = useStore();

  const [updateUser, setUpdateUser] = useState<Inputs | null>(null);

  const notify = (message: string) =>
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email
    }
  });

  const { user } = useUpdateAccount(updateUser);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(isSubmitting);
    setUpdateUser(data);
    // location.reload();
    setOpen(false);
    updateStateProp('updateUser', !state.updateUser);
    notify('Update was successful');
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal open={open} setOpen={setOpen}>
        <div className="bg-gray-200 p-6 rounded w-80 md:w-[500px]">
          <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
            <h3 className="font-medium text-3xl">Edit profile</h3>
            <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpen(false)} />
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
              className="w-full mb-4 p-2"
              id="first_name"
              type="text"
              placeholder={userInfo.first_name}
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
              className="w-full mb-4 p-2"
              id="last_name"
              type="text"
              placeholder={userInfo.last_name}
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
              className="w-full mb-4 p-2"
              id="email"
              type="text"
              placeholder={userInfo.email}
              {...register('email', {
                maxLength: { value: 50, message: 'e-mail is too long.' }
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-xs -mt-4 mb-4">{errors.email.message}</p>
            )}
            <label className="block text-sm mb-2" htmlFor="password">
              Password
            </label>
            <span className="text-xs font-extralight">New Password</span>
            <input
              className="w-full mb-4 p-2"
              id="password"
              type="password"
              {...register('password', {
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
    </>
  );
};

export default EditProfileModal;
