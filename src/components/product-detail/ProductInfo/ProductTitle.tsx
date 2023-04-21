import React from 'react';

type TitleProps = {
  title?: string;
  id?: string;
};

const ProductTitle = ({ title, id }: TitleProps) => {
  return (
    <>
      <h5 className="text-xl font-quicksand uppercase">{title}</h5>
      <p className="font-quicksand text-gray-medium !mt-0">code {id}</p>
    </>
  );
};

export default ProductTitle;
