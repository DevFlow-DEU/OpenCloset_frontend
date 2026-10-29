import type { components } from '../../api/api';
import type { ProductItemProps } from './components/ProductItem';

type BoardItem = components['schemas']['BoardCreateResponsetDto'];

export const toProductItemProps = (item: BoardItem): ProductItemProps => ({
  id: item.id ?? 0,
  name: item.title ?? '',
  rentalCost: item.price ?? 0,
  rentalPeriod: item.rentalDays ?? 0,
  imageUrls: item.images ?? [],
  wished: item.wished ?? false,
  startDate: item.startDate,
  endDate: item.endDate,
  status: (item.status as ProductItemProps['status']) ?? '대여가능',
});
