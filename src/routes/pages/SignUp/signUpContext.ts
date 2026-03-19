import { useOutletContext } from 'react-router-dom';
import type { SignUpForm } from './signUpSchema';
import type { SetStateAction } from 'react';
export type ContextType = SignUpForm & {
  setSignUpData: React.Dispatch<SetStateAction<SignUpForm>>;
};

export function useSignUp() {
  return useOutletContext<ContextType>();
}
