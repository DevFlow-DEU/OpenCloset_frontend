export interface Photo {
  uuid: string;
  file: File;
  src: string;
}

export interface Message {
  photos: Photo[];
  text: string;
}
