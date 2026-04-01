import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import type { ContextType } from './signUpContext';
export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    address: '',
  });
  return (
    <Outlet
      context={{ ...signUpData, setSignUpData } satisfies ContextType}
    ></Outlet>
  );
}
