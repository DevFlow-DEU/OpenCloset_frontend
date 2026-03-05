/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

interface Window {
  kakao?: {
    maps?: {
      load: (callback: () => void) => void;
      LatLng: new (latitude: number, longitude: number) => unknown;
      Map: new (
        container: HTMLElement,
        options: { center: unknown; level: number }
      ) => {
        setCenter: (latLng: unknown) => void;
        relayout: () => void;
      };
      Marker: new (options: { map: unknown; position: unknown }) => {
        setPosition: (latLng: unknown) => void;
      };
    };
  };
}

