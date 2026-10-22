import type { UseFormRegisterReturn } from 'react-hook-form';

export const stubRegister = (name = 'field'): UseFormRegisterReturn => ({
  name,
  onChange: async () => undefined,
  onBlur: async () => undefined,
  ref: () => undefined,
});
