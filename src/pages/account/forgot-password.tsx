import Link from 'next/link';

import React from 'react';

import Container from '~/layouts/Container';

const forgotPassword = () => {
  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 pt-6 pb-24 sm:w-9/12 md:pt-24 md:w-2/4 lg:w-1/3">
        <h1 className="font-bold text-3xl pb-6 mb-4">Forgot your password?</h1>
        <p className="text-sm pb-6 mb-4">
          Enter your email address and we’ll send you an email on how to reset your password.
        </p>
        <div className="pb-6">
          <div className="mb-2">
            <label className="font-bold text-xs text-gray-500 mb-2 block">E-MAIL</label>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              autoComplete="off"
              className="border rounded py-3 px-6 w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <button
            type="button"
            aria-label=""
            className="w-full bg-secondary text-white text-xs font-bold rounded py-3 px-6 transition-all duration-300 hover:text-primary"
          >
            SEND EMAIL
          </button>
          <Link href="/account/login">
            <a className="block w-full bg-gray-200 text-black text-xs text-center font-bold rounded py-3 px-6 mt-4 transition-all duration-300 hover:text-secondary hover:bg-primary">
              BACK TO LOG IN
            </a>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default forgotPassword;
