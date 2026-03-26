import { z } from "zod";

export const RegistrationSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해주세요."),
  description: z.string().trim().min(1, "상세 정보를 입력해주세요."),
  price: z.string().trim().min(1, "가격을 입력해주세요."),
  date: z.string().trim().min(1, "판매 기간을 입력해주세요."),
  place: z.string().trim().min(1, "대여 장소를 입력해주세요."),
  size: z.string().refine((v) => v !== "사이즈 선택", {
    message: "사이즈를 선택해주세요.",
  }),
  sex: z.string().refine((v) => v !== "선택하기" && v !== "", {
    message: "성별을 선택해주세요.",
  }),
  category: z.string().refine((v) => v !== "카테고리 선택", {
    message: "카테고리를 선택해주세요.",
  }),
  image: z.array(z.any()).min(1, "사진을 1장 이상 추가해주세요."),
});

export function validateProductRegistration(values: unknown) {
  const result = RegistrationSchema.safeParse(values);
  return result.success
    ? { ok: true as const, data: result.data }
    : { ok: false as const, fieldErrors: result.error.flatten().fieldErrors };
}