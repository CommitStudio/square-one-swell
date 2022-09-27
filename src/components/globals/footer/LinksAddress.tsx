/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineLinkedin } from 'react-icons/ai';

import { v4 as uuidv4 } from 'uuid';

import footer from '~/data/footer.json';

const { items } = footer;

const LinksAddress = () => {
  return (
    <div className="p-10 flex flex-col md:flex-row space-y-10 md:space-y-0 justify-around">
      <div className="space-y-3">
        {items.slice(0, 4).map(function (item) {
          return (
            <p key={uuidv4()}>
              <a className="hover:text-primary" href="/">
                {item.name}
              </a>
            </p>
          );
        })}
      </div>
      <div className="space-y-3">
        {items.slice(4, 8).map(function (item, i) {
          return (
            <p key={uuidv4()}>
              <a className="hover:text-primary" href="/">
                {item.name}
              </a>
            </p>
          );
        })}
      </div>
      <div className="space-y-3">
        <div className="text-2xl text-primary">STORE FRONT</div>
        <div className="flex flex-col space-y-3">
          <span className="text-lg font-bold">Montevideo, Uruguay</span>
          <span>Blvr. Artigas 1182 +598 2706 5597</span>
          <div className="flex space-x-4 text-3xl cursor-pointer">
            <span className="hover:text-primary">
              <AiOutlineInstagram />
            </span>
            <span className="hover:text-primary">
              <AiOutlineFacebook />
            </span>
            <span className="hover:text-primary">
              <AiOutlineLinkedin />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksAddress;
