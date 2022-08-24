/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';

import footer from '../../../data/footer.json';

const { items } = footer;

const LinksAddress = () => {
  return (
    <div className="p-10 flex flex-col md:flex-row space-y-10 md:space-y-0 justify-around">
      <div className="space-y-3">
        {items.slice(0, 4).map(function (item) {
          return (
            <p key={item.id}>
              <a className="hover:text-primary" href="/">
                {item.name}
              </a>
            </p>
          );
        })}
      </div>
      <div className="space-y-3">
        {items.slice(4, 8).map(function (item) {
          return (
            <p key={item.id}>
              <a className="hover:text-primary" href="/">
                {item.name}
              </a>
            </p>
          );
        })}
      </div>
      <div className="space-y-3">
        {items.slice(8, 12).map(function (item) {
          return (
            <p key={item.id}>
              <a className="hover:text-primary" href="/">
                {item.name}
              </a>
            </p>
          );
        })}
      </div>
      <div className="space-y-3">
        <p className="text-2xl text-primary">STORE FRONT</p>
        <p className="flex flex-col space-y-2">
          <span className="text-lg font-bold">Montevideo, Uruguay</span>
          <span>Blvr. Artigas 1182 +598 2706 5597</span>
        </p>
      </div>
    </div>
  );
};

export default LinksAddress;
