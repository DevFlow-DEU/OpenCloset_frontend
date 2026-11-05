import type { components } from '../../api/api';

export type ChatRoomItem = components['schemas']['ChatRoomResponseDto'];

export interface Photo {
  uuid: string;
  file: File;
  src: string;
}

export interface Message {
  photos: Photo[];
  text: string;
}
