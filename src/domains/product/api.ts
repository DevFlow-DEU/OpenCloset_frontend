import { fetchClient } from '../../api/client';
import type { components } from '../../api/api';
import { ApiError } from '../../api/http';

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

export type UpdateBoardForm = {
  title?: string;
  description?: string;
  images?: File[];
  size?: string;
  sex?: string;
  latitude?: number;
  longitude?: number;
  price?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
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
  updateBoard: async (id: string | number, form: UpdateBoardForm) => {
    const formData = new FormData();
    if (form.title !== undefined) formData.append('title', form.title);
    if (form.description !== undefined) {
      formData.append('description', form.description);
    }
    form.images?.forEach((image) => formData.append('images', image));
    if (form.size !== undefined) formData.append('size', form.size);
    if (form.sex !== undefined) formData.append('sex', form.sex);
    if (form.latitude !== undefined) {
      formData.append('latitude', String(form.latitude));
    }
    if (form.longitude !== undefined) {
      formData.append('longitude', String(form.longitude));
    }
    if (form.price !== undefined) formData.append('price', String(form.price));
    if (form.startDate !== undefined) {
      formData.append('startDate', form.startDate);
    }
    if (form.endDate !== undefined) {
      formData.append('endDate', form.endDate);
    }
    if (form.category !== undefined) {
      formData.append('category', form.category);
    }

    const { data, error, response } = await fetchClient.PUT('/board/{id}', {
      params: { path: { id: Number(id) } },
      body: formData as unknown as components['schemas']['BoardUpdateRequestDto'],
    });
    if (!response.ok) throw new ApiError(response.status, error ?? null);
    return data;
  },
  toggleWishlist: async (boardId: string | number) => {
    const { data, error, response } = await fetchClient.POST(
      '/wishlist/{boardId}',
      { params: { path: { boardId: Number(boardId) } } }
    );
    if (!response.ok) throw new ApiError(response.status, error ?? null);
    return data;
  },
  updateStatus: async (
    id: string | number,
    status: string,
    buyerId?: number
  ) => {
    const { data, error, response } = await fetchClient.PATCH(
      '/board/{id}/status',
      { params: { path: { id: Number(id) }, query: { status, buyerId } } }
    );
    if (!response.ok) throw new ApiError(response.status, error ?? null);
    return data;
  },
};
