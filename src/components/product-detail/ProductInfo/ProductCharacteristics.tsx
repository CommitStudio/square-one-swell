import React from 'react';

type Characteristics = {
  characteristics?: string[];
};

const ProductCharacteristics = ({ characteristics }: Characteristics) => {
  return (
    <ul className="space-y-2">
      {characteristics?.map((characteristic, i) => {
        return <li key={i}>• {characteristic}</li>;
      })}
    </ul>
  );
};

export default ProductCharacteristics;
