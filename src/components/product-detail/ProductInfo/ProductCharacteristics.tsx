import React from 'react';

import { v4 as uuidv4 } from 'uuid';

type Characteristics = {
  characteristics?: string[];
};

const ProductCharacteristics = ({ characteristics }: Characteristics) => {
  return (
    <ul className="space-y-2">
      {characteristics?.map((characteristic) => {
        return <li key={uuidv4()}>• {characteristic}</li>;
      })}
    </ul>
  );
};

export default ProductCharacteristics;
