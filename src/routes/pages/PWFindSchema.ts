import { z } from "zod";


export const findSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
})
export type LoginFormValues = z.infer<typeof findSchema>;


export function validateEmail(values: unknown) {
  const result = findSchema.safeParse(values);
  return result.success
    ? { ok: true as const, data: result.data.email }
    : { ok: false as const, fieldErrors: result.error.flatten().fieldErrors.email };
}