import { useMutation } from '@tanstack/react-query';
import { authQueries } from './queries';

export function useLogin() {
  return useMutation(authQueries.login());
}

export function useRegister() {
  return useMutation(authQueries.register());
}

export function usePasswordReset() {
  return useMutation(authQueries.passwordReset());
}

export function useKakaoSignUp() {
  return useMutation(authQueries.kakaoSignUp());
}

export function useKakaoCallback() {
  return useMutation(authQueries.kakaoCallback());
}
