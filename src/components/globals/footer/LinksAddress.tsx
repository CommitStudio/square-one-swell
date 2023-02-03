/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import React from 'react';
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineLinkedin } from 'react-icons/ai';

import footer from '~/data/footer.json';

import data from '~/data/partials.json';

const { items } = footer;

const LinksAddress = () => {
  return (
    <div className="p-10 flex flex-col md:flex-row space-y-10 md:space-y-0 justify-around">
      <div className="space-y-3">
        {items.slice(0, 4).map(function (item, i) {
          return (
            <p key={`address-item-1.${i}`}>
              <Link href={item.href}>
                <a className="hover:text-primary" href="/">
                  {item.name}
                </a>
              </Link>
            </p>
          );
        })}
      </div>
      <div className="space-y-3">
        {items.slice(4, 8).map(function (item, i) {
          return (
            <p key={`address-item-2.${i}`}>
              <Link href={item.href}>
                <a className="hover:text-primary" href="/">
                  {item.name}
                </a>
              </Link>
            </p>
          );
        })}
      </div>
      <div className="space-y-3">
        <div className="text-xl font-semibold whitespace-nowrap text-primary">
          {data.brand_name}
        </div>
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
