import * as z from 'zod';

export const SignUpSchema = z
  .object({
    nicknameDuplicateCheck: z.literal(
      [true, false],
      '닉네임 중복확인을 진행해주세요'
    ),
    nickname: z.string().min(1, '닉네임을 입력해주세요'),
    emailLocalPart: z
      .string()
      .min(1, '이메일 계정 부분을 입력해주세요.')
      .regex(
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]/i,
        '올바른 이메일을 입력해주세요'
      ),
    emailDomain: z
      .string()
      .min(1, '이메일 도메인 부분을 입력해주세요')
      .regex(
        /([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
        '올바른 이메일을 입력해주세요.'
      ),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)/, '영문과 숫자를 포함해야 합니다.'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    address: z.string().min(1, '주소를 등록해주세요.'),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignUpForm = z.infer<typeof SignUpSchema>;
