import Link from 'next/link';
import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import Container from '~/layouts/Container';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 pt-6 pb-24 sm:w-9/12 md:pt-24 md:w-6/12 lg:w-4/12">
        <h1 className="font-bold text-3xl pb-6 mb-4">Log in</h1>
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
                placeholder="E-mail"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline-secondary"
                {...register('email', { required: '*Email Address is required', minLength: 2 })}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p role="alert" className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="mb-2">
              <label className="font-bold text-xs text-gray-500 mb-2 block">PASSWORD</label>
              <input
                type="password"
                placeholder="Your password"
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline-secondary"
                {...register('password', {
                  required: '*A valid password is required',
                  minLength: 6
                })}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p role="alert" className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>
          <Link href={'/account/forgot-password'}>
            <a className="inline-block text-xs text-gray-500 mt-4 md:mt-6 hover:text-secondary">
              Did you forgot your password?
            </a>
          </Link>
          <div className="mt-8 mb-4">
            <button
              type="submit"
              aria-label=""
              className="w-full bg-secondary text-white text-xs font-bold rounded py-3 px-6 transition-all duration-300 hover:text-primary"
            >
              LOG IN
            </button>
            <Link href="/account/create-account">
              <a className="block w-full bg-gray-200 text-black text-xs text-center font-bold rounded py-3 px-6 mt-4 transition-all duration-300 hover:text-secondary hover:bg-primary">
                CREATE ACCOUNT
              </a>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
