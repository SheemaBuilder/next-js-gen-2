import React from 'react';
import { products } from './products';

interface ProductSelectProps {
  productItem: { value: number; label: string }[];
}


const ProductSelect: React.FC<ProductSelectProps> = ({ productItem = products }) => {
  if (!Array.isArray(productItem)) {
    console.error('productItem is not an array:', productItem);
    return null;
  }
  console.log("Products:", products)
  return (
    <div>
      <select>
        {productItem.map((product, index) => (
          <option key={index} value={product.value}>
            {product.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelect
