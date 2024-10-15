import React from 'react';
import { numbers } from './numbers';
interface NumberSelectProps {
  numberList: { label: string; value: number }[];
}

const NumberSelect: React.FC<NumberSelectProps> = ({ numberList = numbers }) => {
  if (!Array.isArray(numberList)) {
    console.error('numberList is not an array:', numberList);
    return null;
  }

  return (
    <div>
      <select>
        {numberList.map((number, index) => (
          <option key={index} value={number.value}>
            {number.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NumberSelect;

