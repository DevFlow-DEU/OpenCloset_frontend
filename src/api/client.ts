import createClient from 'openapi-fetch';
import type { paths } from './api';

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACK_URL,
});
