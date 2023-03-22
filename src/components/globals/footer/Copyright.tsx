import React from 'react';

const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-black bg-gray-300 font-bold p-5 text-center min-h-[70px]">
      <span className="px-3">© Copyright</span> | <span className="px-3">{currentYear}</span>
    </div>
  );
};

export default Copyright;
