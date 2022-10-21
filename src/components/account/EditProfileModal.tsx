import { SubmitHandler, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

import Modal from '~/components/account/Modal';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  createAccount: boolean;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfileModal = ({ open, setOpen }: Props) => {
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
      <div className="bg-gray-200 p-4 rounded w-80">
        <div className="flex items-center justify-between mb-4 gap-x-4 w-full">
          <h3 className="font-medium text-3xl">Edit profile</h3>
          <GrClose className="cursor-pointer min-w-[16px]" onClick={() => setOpen(false)} />
        </div>
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <label className="block font-light text-sm" htmlFor="firstName">
            First name
          </label>
          <input
            className="w-full mb-4"
            id="firstName"
            type="text"
            {...register('firstName', {
              required: 'Please enter your first name.',
              maxLength: { value: 50, message: 'first name is too long.' }
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
          <label className="block font-light text-sm" htmlFor="email">
            E-mail
          </label>
          <input
            className="w-full mb-4"
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
          <label className="block font-light text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="w-full mb-4"
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
          <label className="block font-light text-sm" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            className="w-full mb-4"
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please enter your password.',
              minLength: { value: 6, message: 'Must include a minimum of 6 characters.' }
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs -mt-4 mb-4">{errors.confirmPassword.message}</p>
          )}
          <div className="flex items-center gap-4">
            <label className="block font-light text-sm" htmlFor="createAccount">
              Create account
            </label>
            <input className="" id="createAccount" type="checkbox" {...register('createAccount')} />
          </div>
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
