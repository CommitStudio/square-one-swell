import React from 'react';

type TitleProps = {
  title?: string;
};

const ProductTitle = ({ title }: TitleProps) => {
  return <div className="text-2xl">{title}</div>;
};

export default ProductTitle;
