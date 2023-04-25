import React from 'react';

type TitleProps = {
  title?: string;
  id?: string;
};

const ProductTitle = ({ title }: TitleProps) => {
  return (
    <>
      <h5 className="text-xl font-quicksand uppercase">{title}</h5>
    </>
  );
};

export default ProductTitle;
