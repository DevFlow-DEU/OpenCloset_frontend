import ProductItem from './ProductItem';
import styles from './ProductList.module.css';
export default function ProductList({ products }) {
  return (
    <div className={styles['item-container']}>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
}
