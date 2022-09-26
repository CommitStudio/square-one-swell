import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

type Colors = {
  colors?: string[];
};

const ProductColors = ({ colors }: Colors) => {
  const [colorSelected, setColorSelected] = useState('');
  return (
    <div className="flex items-center space-x-3">
      <span>Colors:</span>
      {colors?.map((color) => {
        return (
          <div key={uuidv4()} className="w-4 flex justify-center">
            <button
              onClick={() => setColorSelected(color)}
              className={`bg-[${color}] ${
                colorSelected === color ? 'border-2 border-primary' : 'border-secondary'
              } rounded-full w-4 h-4 border hover:border-primary hover:p-2`}
            ></button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductColors;
