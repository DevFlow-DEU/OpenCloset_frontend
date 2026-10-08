import { mutationOptions } from '@tanstack/react-query';
import {
  completeKakaoSignUp,
  kakaoCallback,
  login,
  registerUser,
  requestPasswordReset,
} from './api';

export const authQueries = {
  login: () => mutationOptions({ mutationFn: login }),
  register: () => mutationOptions({ mutationFn: registerUser }),
  passwordReset: () =>
    mutationOptions({
      mutationFn: (values: { email: string }) =>
        requestPasswordReset(values.email),
    }),
  kakaoSignUp: () => mutationOptions({ mutationFn: completeKakaoSignUp }),
  kakaoCallback: () => mutationOptions({ mutationFn: kakaoCallback }),
};
