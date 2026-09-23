import { useState, useEffect } from 'react';

function useProducts(path, token, options = { method: 'GET' }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async (path, token) => {
      try {
        const response = await fetch(`http://113.198.229.158:8880/${path}`, {
          method: options.method,
          body: options.body,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('요청이 정상적으로 처리되지 않았습니다.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts(path, token);
  }, [options.body]);
  return products;
}
export { useProducts };
