import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';
import type { paths } from './api';
import { BACK_URL } from './http';
import { authMiddleware } from './middleware';

export const fetchClient = createFetchClient<paths>({
  baseUrl: BACK_URL,
});

fetchClient.use(authMiddleware);

export const $api = createQueryClient(fetchClient);
