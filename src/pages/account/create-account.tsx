import Link from 'next/link';
import React from 'react';

import Container from '~/layouts/Container';

const CreateAccount = () => {
  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 pt-6 pb-24 sm:w-9/12 md:pt-24 md:w-2/4 lg:w-1/3">
        <h1 className="font-bold text-3xl pb-6 mb-4">Create account</h1>
        <div className="pb-6">
          <div className="mb-2">
            <label className="font-bold text-xs text-gray-500 mb-2 block">FIRST NAME</label>
            <input
              type="text"
              placeholder=""
              name="firstname"
              autoComplete="off"
              className="w-full border rounded py-3 px-6"
            />
          </div>
        </div>
        <div className="pb-6">
          <div className="mb-2">
            <label className="font-bold text-xs text-gray-500 mb-2 block">LAST NAME</label>
            <input
              type="text"
              placeholder=""
              name="lastname"
              autoComplete="off"
              className="w-full border rounded py-3 px-6"
            />
          </div>
        </div>
        <div className="pb-6">
          <div className="mb-2">
            <label className="font-bold text-xs text-gray-500 mb-2 block">E-MAIL</label>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              autoComplete="off"
              className="w-full border rounded py-3 px-6"
            />
          </div>
        </div>
        <div>
          <div className="mb-2">
            <label className="font-bold text-xs text-gray-500 mb-2 block">PASSWORD</label>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              autoComplete="off"
              className="w-full border rounded py-3 px-6"
            />
          </div>
        </div>
        <span className="inline-block text-xs text-gray-500">
          Must include a minimum of 6 characters.
        </span>
        <div className="mt-8 mb-4">
          <button
            type="button"
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
      </div>
    </Container>
  );
};

export default CreateAccount;
