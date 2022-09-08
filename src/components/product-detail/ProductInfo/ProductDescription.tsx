import React from 'react';

type Description = {
  description?: string;
};

const ProductDescription = ({ description }: Description) => {
  return <div className="font-light">{description}</div>;
};

export default ProductDescription;
