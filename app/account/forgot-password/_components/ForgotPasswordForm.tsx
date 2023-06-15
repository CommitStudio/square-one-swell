'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BsArrowLeft } from 'react-icons/bs';

import Button from '~/_components/Button';

import Container from '~/_layouts/Container';

import swell from '~/_lib/SwellJS';
import { notifyFailure } from '~/_utils/toastifies';

type Inputs = {
  email: string;
  password: string;
};

const ForgotPasswordForm = () => {
  const [confirmation, setConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await swell.account.recover({
        email: data.email,
        reset_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account/reset-password?key={reset_key}`
      });

      setConfirmation(true);
    } catch (error) {
      notifyFailure('There was an error sending your email. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center font-quicksand">
      <div className="w-11/12 border p-6 my-14 rounded sm:w-9/12 md:w-6/12 md:p-8 lg:w-6/12 lg:p-12">
        <h1 className="font-libre font-semibold text-3xl pb-6 mb-4">Forgot your password?</h1>
        <p className="text-sm pb-6 mb-4">
          Enter your email address and we&apos;ll send you an email on how to reset your password.
        </p>
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <div className="pb-6">
            <div className="mb-2">
              <label className="font-bold text-gray-dark mb-2 block">E-MAIL</label>
              <input
                type="email"
                placeholder="example@mail.com"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline focus:outline-2 focus:outline-gray-medium"
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
              <div className="text-gray-dark text-sm pb-8 text-center">
                <p>Please check your email for next steps.</p>
                <p>If the email is not in our system, you will not receive an email.</p>
              </div>
            )}
            <Button label="SEND EMAIL" fullWidth type="submit" disabled={confirmation} />
            <div className="flex items-center justify-center">
              <Link
                href={'/account/login'}
                className="flex items-center justify-center text-sm mt-4 hover:underline group"
              >
                <BsArrowLeft className="text-lg mr-1 group-hover:-translate-x-1" />
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPasswordForm;
