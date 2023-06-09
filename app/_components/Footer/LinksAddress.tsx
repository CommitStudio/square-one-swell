/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

import company from '~/_data/company.json';
import footer from '~/_data/footer.json';
import Container from '~/_layouts/Container';

const { items } = footer;

const LinksAddress = () => {
  const companyName = company.name;

  return (
    <Container>
      <div className="py-10 grid grid-cols-2 md:grid-cols-3 gap-y-10">
        <div className="space-y-4">
          {items.slice(0, 4).map(function (item, i) {
            return (
              <p key={`address-item-1.${i}`}>
                <Link href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              </p>
            );
          })}
        </div>
        <div className="space-y-4">
          {items.slice(4, 8).map(function (item, i) {
            return (
              <p key={`address-item-2.${i}`}>
                <Link href={item.href} className="hover:underline">
                  {item.name}
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
            <div className="flex space-x-4 text-3xl">
              <span className="hover:text-green cursor-pointer">
                <FaInstagram />
              </span>
              <span className="hover:text-green cursor-pointer">
                <FaFacebook />
              </span>
              <span className="hover:text-green cursor-pointer">
                <FaLinkedin />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LinksAddress;
