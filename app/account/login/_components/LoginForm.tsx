'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import Button from '~/_components/Button';

import Container from '~/_layouts/Container';
import swell from '~/_lib/SwellJS';
import { notifyFailure, notifySuccess } from '~/_utils/toastifies';

type Inputs = {
  email: string;
  password: string;
  dontComplete: string;
};

const LoginForm = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  // Submit login form
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // If statement is declared incase captcha input is filled (probable bot).
    if (data.dontComplete) {
      return;
    }
    setIsSubmitting(true);

    const { email, password } = data;

    swell.account
      .login(email, password)
      .then((account) => {
        if (account) {
          notifySuccess(
            'Welcome! You are now logged in and can proceed to checkout or continue shopping'
          );
          document.location.href = '/';
        } else {
          notifyFailure('Something went wrong. Please check your credentials');
          setInvalidLogin(true);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center font-quicksand">
      <div className="w-11/12 border p-6 my-14 rounded sm:w-9/12 md:w-6/12 md:p-8 lg:w-6/12 lg:p-12">
        <div className="pb-6 mb-4">
          <h1 className="font-libre first-line:font-semibold text-3xl mb-2">Log in</h1>
          {invalidLogin && (
            <p className="text-red-500 text-sm">There was an error logging in. Please try again.</p>
          )}
          <span>
            <span className="text-red-500">*</span> Indicates a required field
          </span>
        </div>
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <div className="pb-6">
            <div className="mb-2">
              <label htmlFor="email" className="font-bold text-gray-dark mb-2 block">
                E-MAIL <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
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
          <div>
            <div className="mb-2">
              <label htmlFor="password" className="font-bold text-gray-dark mb-2 block">
                PASSWORD <span className="text-red-500">*</span>
              </label>
              <div className="flex border rounded focus-within:outline focus-within:outline-2 focus-within:outline-secondary">
                <input
                  id="password"
                  type={`${isHidden ? 'password' : 'text'}`}
                  placeholder="••••••"
                  autoComplete="off"
                  className="w-full rounded rounded-r-none py-3 px-6 focus:outline-none"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Please enter a valid password'
                    }
                  })}
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                <button
                  type="button"
                  onClick={() => setIsHidden(!isHidden)}
                  className="inline-flex h-fit my-auto mx-3 text-2xl text-gray-700 rounded-r"
                >
                  {isHidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              {errors.password && (
                <p role="alert" className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          {/* CAPTCHA */}
          <div className="absolute inset-0 h-0 w-0 opacity-0">
            <label htmlFor="dontComplete">Don&apos;t fill this input</label>
            <input tabIndex={-1} type="text" id="dontComplete" {...register('dontComplete')} />
          </div>
          <Link href={'/account/forgot-password'} legacyBehavior>
            <span className="inline-block text-sm mt-4 md:mt-6">
              Forgot your password?&nbsp;
              <a className="font-bold cursor-pointer border-b hover:pb-0.5">Reset it</a>.
            </span>
          </Link>
          <div className="mt-7 mb-4">
            <Button fullWidth type="submit" label="LOG IN" disabled={isSubmitting} />

            <Link href={'/account/create-account'} legacyBehavior>
              <span className="block text-center text-sm mt-4">
                Don&apos;t have an account?&nbsp;
                <a className="font-bold cursor-pointer border-b hover:pb-0.5">Create it</a>.
              </span>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
