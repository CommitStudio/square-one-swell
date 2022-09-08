import React from 'react';

type Characteristics = {
  characteristics?: string[];
};

const ProductCharacteristics = ({ characteristics }: Characteristics) => {
  return (
    <ul className="space-y-2">
      {characteristics?.map((characteristic) => {
        return <li key={characteristic}>• {characteristic}</li>;
      })}
    </ul>
  );
};

export default ProductCharacteristics;
