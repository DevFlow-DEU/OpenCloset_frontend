import { z } from "zod";

/**
 * 로그인 무결성 검사 스키마
 * - 이메일: 빈값 금지 + 이메일 형식
 * - 비밀번호: 빈값 금지 + (원하면) 최소 길이/규칙 추가 가능
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  password: z
    .string()
    .trim()
    .min(1, "비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다."), // 필요없으면 이 줄 지워도 됨
})
export type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * (선택) 코드에서 직접 검증하고 싶을 때 쓰는 함수
 * - 성공: { ok: true, data }
 * - 실패: { ok: false, fieldErrors }
 */
export function validateLogin(values: unknown) {
  const result = loginSchema.safeParse(values);
  if (result.success) return { ok: true as const, data: result.data };

  const fieldErrors = result.error.flatten().fieldErrors;
  return { ok: false as const, fieldErrors };
}