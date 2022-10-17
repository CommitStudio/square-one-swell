import Link from 'next/link';

import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import Container from '~/layouts/Container';

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 pt-6 pb-24 sm:w-9/12 md:pt-24 md:w-6/12 lg:w-4/12">
        <div className="pb-6 mb-4">
          <h1 className="font-bold text-3xl mb-2">Create account</h1>
          <span className="text-sm">* Indicates a required field</span>
        </div>
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <div className="pb-6">
            <div className="mb-2">
              <label className="font-bold text-xs text-gray-500 mb-2 block">* FIRST NAME</label>
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
              <label className="font-bold text-xs text-gray-500 mb-2 block">* LAST NAME</label>
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
              <label className="font-bold text-xs text-gray-500 mb-2 block">* E-MAIL</label>
              <input
                type="email"
                placeholder="E-mail"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline-secondary"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^.{1,}[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
                  {errors.email.type === 'pattern' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div>
            <div className="mb-2">
              <label className="font-bold text-xs text-gray-500 mb-2 block">* PASSWORD</label>
              <input
                type="password"
                placeholder="Your password"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline-secondary"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Please enter a valid password'
                  }
                })}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
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
          <div className="mt-8 mb-4">
            <button
              type="submit"
              aria-label=""
              className="w-full bg-secondary text-white text-xs font-bold rounded py-3 px-6 transition-all duration-300 hover:text-primary"
            >
              CREATE ACCOUNT
            </button>

            <Link href="/account/login">
              <a className="block w-full bg-gray-200 text-black text-xs text-center font-bold rounded py-3 px-6 mt-4 transition-all duration-300 hover:text-secondary hover:bg-primary">
                LOG IN
              </a>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CreateAccount;
