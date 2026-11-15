import type { components } from '../../api/api';

export type ChatRoomItem = components['schemas']['ChatRoomResponseDto'];

export type ChatMessageItem = components['schemas']['ChatMessageResponseDto'];

export type WearerItem = components['schemas']['WearerListResponseDto'];

export interface Photo {
  uuid: string;
  file: File;
  src: string;
}

export interface Message {
  photos: Photo[];
  text: string;
}
