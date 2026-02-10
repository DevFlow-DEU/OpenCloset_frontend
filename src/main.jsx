import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './routes';
async function enableMocking() {
  if (import.meta.env.VITE_MOCK !== 'true') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const kakaoInit = (tries = 50) => {
  const key = import.meta.env.VITE_KAKAO_JS;

  if (window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(key);
    }
    return;
  }

  if (tries <= 0) {
    console.warn("Kakao SDK 오류");
    return;
  }

  setTimeout(() => kakaoInit(tries - 1), 50);
};

kakaoInit();



enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Router />
    </StrictMode>
  );
});
