import { fetchClient } from '../../api/client';
import type { components } from '../../api/api';
import { apiFetch, ApiError } from '../../api/http';

export type ProductDetail = {
  id: number;
  title: string;
  description: string;
  images: string[];
  size: string;
  sex: string;
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
  category: string;
  price: number;
  rentalDays: number;
  status: string;
  sellerId: number;
  sellerNickname: string;
  buyerId: number | null;
  buyerNickname: string | null;
  createAt: string;
  wished: boolean;
  owner: boolean;
};

export type CreateBoardForm = {
  title: string;
  description: string;
  price: string;
  date: string;
  category: string;
  size: string;
  sex: string;
  place: string;
  image: File;
};

export const productApi = {
  create: async (form: CreateBoardForm) => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('date', form.date);
    formData.append('category', form.category);
    formData.append('size', form.size);
    formData.append('sex', form.sex);
    formData.append('place', form.place);
    formData.append('image', form.image);

    const { data, error, response } = await fetchClient.POST('/board/create', {
      body: formData as unknown as components['schemas']['BoardCreateRequestDto'],
    });
    if (!response.ok) throw new ApiError(response.status, error ?? null);
    return data;
  },
  updateStatus: (id: string | number, status: string) =>
    apiFetch<ProductDetail>(
      `/board/${id}/status?${new URLSearchParams({ status }).toString()}`,
      { method: 'PATCH' }
    ),
};
