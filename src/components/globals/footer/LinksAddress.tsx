/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

import company from '~/data/company.json';
import footer from '~/data/footer.json';

const { items } = footer;

const LinksAddress = () => {
  const companyName = company.name;

  return (
    <div className="p-10 flex flex-col md:flex-row space-y-10 md:space-y-0 justify-around">
      <div className="space-y-4">
        {items.slice(0, 4).map(function (item, i) {
          return (
            <p key={`address-item-1.${i}`}>
              <Link href={item.href}>
                <a className="hover:underline" href="/">
                  {item.name}
                </a>
              </Link>
            </p>
          );
        })}
      </div>
      <div className="space-y-4">
        {items.slice(4, 8).map(function (item, i) {
          return (
            <p key={`address-item-2.${i}`}>
              <Link href={item.href}>
                <a className="hover:underline" href="/">
                  {item.name}
                </a>
              </Link>
            </p>
          );
        })}
      </div>
      <div className="space-y-4">
        <div className="text-3xl font-semibold whitespace-nowrap font-libre">
          {companyName.toUpperCase()}
        </div>
        <div className="flex flex-col space-y-4">
          <span className="text-lg">
            {company.city}, {company.country}
          </span>
          <span>
            {company.address}, {company.phone}
          </span>
          <div className="flex space-x-4 text-3xl cursor-pointer ">
            <span className="hover:text-gray-medium">
              <FaInstagram />
            </span>
            <span className="hover:text-gray-medium">
              <FaFacebook />
            </span>
            <span className="hover:text-gray-medium">
              <FaLinkedin />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksAddress;
