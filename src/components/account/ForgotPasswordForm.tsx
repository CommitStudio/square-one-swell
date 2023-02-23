import Link from 'next/link';
import { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { BsArrowLeft } from 'react-icons/bs';

import { swell } from '~/hooks/useSwellConection';

import Container from '~/layouts/Container';
import { notifyFailure } from '~/utils/toastifies';

const { NEXT_PUBLIC_BASE_URL } = process.env;

type Inputs = {
  email: string;
  password: string;
};

const ForgotPasswordForm = () => {
  const [confirmation, setConfirmation] = useState(false); //Used to show confirmation message after form is submitted

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await swell.account.recover({
        email: data.email,
        reset_url: `${NEXT_PUBLIC_BASE_URL}/account/reset-password?key={reset_key}`
      });
      setConfirmation(true); //Turn on confirmation that a message has been sent
    } catch (error) {
      notifyFailure('There was an error sending your email. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 border p-6 my-14 rounded sm:w-9/12 md:w-6/12 md:p-8 lg:w-6/12 lg:p-12">
        <h1 className="font-bold text-3xl pb-6 mb-4">Forgot your password?</h1>
        <p className="text-sm pb-6 mb-4">
          Enter your email address and we’ll send you an email on how to reset your password.
        </p>
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <div className="pb-6">
            <div className="mb-2">
              <label className="font-bold text-xs text-gray-500 mb-2 block">E-MAIL</label>
              <input
                type="email"
                placeholder="example@mail.com"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline focus:outline-2 focus:outline-secondary"
                {...register('email', {
                  required: 'Email address is required',
                  maxLength: {
                    value: 100,
                    message: 'The email address is too long'
                  },
                  pattern: {
                    value: /^.{1,}[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p role="alert" className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            {confirmation && (
              <div className="text-gray-500 text-sm pb-8 text-center">
                <p>Please check your email for next steps.</p>
                <p>If the email is not in our system, you will not receive an email.</p>
              </div>
            )}
            <button
              type="submit"
              aria-label=""
              className="w-full bg-secondary text-white text-sm font-bold rounded py-4 px-6 transition-all duration-300 hover:text-secondary hover:bg-primary"
            >
              SEND EMAIL
            </button>
            <div className="flex items-center justify-center">
              <Link href={'/account/login'}>
                <a className="flex items-center justify-center text-sm mt-4 text-blue-700 cursor-pointer hover:underline">
                  <BsArrowLeft className="text-lg mr-1" />
                  Log in
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPasswordForm;
