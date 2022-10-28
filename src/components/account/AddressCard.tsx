import React from 'react';

const AddressCard = () => {
  return (
    <div className="hidden md:grid md:auto-rows-fr md:grid-cols-2 md:gap-8">
      <div className="flex rounded bg-primary-lightest p-4 shadow-md justify-between">
        <div className="space-y-2">
          <p>FirstName Lastname</p>
          <p>apt floor suit, address</p>
          <p>city zip code</p>
          <p>AR UY</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="label-xs-bold rounded bg-primary-light p-2 bg-gray-200">Default</p>
          <button className="px-2">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
