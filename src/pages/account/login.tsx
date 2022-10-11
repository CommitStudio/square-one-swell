import React from 'react';

import Container from '~/layouts/Container';

const login = () => {
  return (
    <Container className="flex flex-grow flex-col justify-center items-center">
      <div className="pt-6 pb-24 md:pt-24">
        <h1 className="font-bold text-3xl pb-6 mb-4">Log in</h1>
        <div className="pb-6">
          <div className="mb-2">
            <label className="font-bold text-xs text-gray-500 mb-2 block">E-MAIL</label>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              autoComplete="off"
              className="border rounded py-3 px-6"
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
              className="border rounded py-3 px-6"
            />
          </div>
        </div>
        <div className="mt-8 mb-4">
          <button
            type="button"
            aria-label=""
            className="w-full bg-secondary text-white text-xs font-bold rounded py-3 px-6 transition-all duration-300 hover:text-primary"
          >
            LOG IN
          </button>
        </div>
      </div>
    </Container>
  );
};

export default login;
