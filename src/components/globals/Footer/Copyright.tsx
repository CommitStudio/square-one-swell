import React from 'react';

const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border border-t-primary border-b-transparent border-x-transparent p-5 text-center">
      © Copyright | <span className="font-bold">Store Front </span> | {currentYear}
    </div>
  );
};

export default Copyright;
