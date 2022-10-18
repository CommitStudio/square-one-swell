import Link from 'next/link';
import { useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import Container from '~/layouts/Container';

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 pt-6 pb-24 px-2 sm:w-9/12 md:pt-24 md:w-6/12 lg:w-5/12 lg:px-6">
        <div className="pb-6 mb-4">
          <h1 className="font-bold text-3xl mb-2">Create account</h1>
          <span className="text-sm">
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
              <label className="font-bold text-xs text-gray-500 mb-2 block">
                FIRST NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your first name"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline-secondary"
                {...register('firstname', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'Please enter a valid first name'
                  }
                })}
                aria-invalid={errors.firstname ? 'true' : 'false'}
              />

              {errors.firstname ? (
                <>
                  {errors.firstname.type === 'required' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.firstname.message}
                    </p>
                  )}
                  {errors.firstname.type === 'minLength' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.firstname.message}
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div className="pb-6">
            <div className="mb-2">
              <label className="font-bold text-xs text-gray-500 mb-2 block">
                LAST NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your last name"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline-secondary"
                {...register('lastname', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Please enter a valid last name'
                  }
                })}
                aria-invalid={errors.lastname ? 'true' : 'false'}
              />

              {errors.lastname ? (
                <>
                  {errors.lastname.type === 'required' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.lastname.message}
                    </p>
                  )}
                  {errors.lastname.type === 'minLength' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.lastname.message}
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div className="pb-6">
            <div className="mb-2">
              <label className="font-bold text-xs text-gray-500 mb-2 block">
                E-MAIL <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline-secondary"
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
              {errors.email ? (
                <>
                  {errors.email.type === 'required' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email.type === 'maxLength' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email.type === 'pattern' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </div>

          <div className="pb-6">
            <div className="mb-2">
              <label className="font-bold text-xs text-gray-500 mb-2 block">
                PASSWORD <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  type={`${isHidden ? 'password' : 'text'}`}
                  placeholder="••••••"
                  autoComplete="off"
                  className="w-full border border-r-0 rounded rounded-r-none py-3 px-6 focus:outline-secondary"
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
                  className="inline-flex items-center px-3 text-2xl text-gray-700 rounded-r border border-l-0 border-gray-200"
                >
                  {isHidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              {errors.password ? (
                <>
                  {errors.password.type === 'required' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  {errors.password.type === 'minLength' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </>
              ) : null}
              <span className="inline-block text-xs text-gray-500">
                Must include a minimum of 6 characters.
              </span>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms-policy"
                type="checkbox"
                onClick={() => setIsChecked(!isChecked)}
                className="w-6 h-6"
                required
              />
            </div>
            <label htmlFor="terms-policy" className="ml-3 text-sm">
              By signing up, you accept our
              <Link href={'#'}>
                <a className="text-blue-700 cursor-pointer hover:underline"> Terms of Service </a>
              </Link>
              and
              <Link href={'#'}>
                <a className="text-blue-700 cursor-pointer hover:underline"> Privacy Policy</a>
              </Link>
              .
            </label>
          </div>

          <div className="mt-8 mb-4">
            <button
              type="submit"
              aria-label=""
              className={`w-full bg-secondary text-white text-xs font-bold rounded py-3 px-6 transition-all duration-300 ${
                isChecked
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:text-secondary hover:bg-primary'
              }`}
              disabled={isChecked}
            >
              CREATE ACCOUNT
            </button>

            <span className="block text-center text-sm mt-4">
              Already have an account?
              <Link href={'/account/login'}>
                <a className="text-blue-700 cursor-pointer hover:underline"> Log in</a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default RegisterForm;
