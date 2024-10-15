import React, { useEffect, useState } from 'react';

interface Product {
  value: number;
  label: string;
}

interface ProductApiProps {
  productItem?: Product[];
}

const ProductApi: React.FC<ProductApiProps> = ({ productItem = [] }) => {
  const [products, setProducts] = useState<Product[]>(productItem);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const response = await fetch('https://product-6x8kua5cp-sheemaparwazs-projects.vercel.app/products');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: Product[] = await response.json();
          setProducts(data);
          setLoading(false);
        } catch (error) {
          setError((error as Error).message);
          setLoading(false);
        }
      };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <select>
        {products.map((product, index) => (
          <option key={index} value={product.value}>
            {product.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductApi;
