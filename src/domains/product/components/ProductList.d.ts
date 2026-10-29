import type { ReactElement } from 'react';
import type { ProductItemProps } from './ProductItem';

declare function ProductList(props: {
  products: ProductItemProps[];
}): ReactElement;

export default ProductList;
