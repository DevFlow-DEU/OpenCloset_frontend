import {  z } from "zod";

export const pwChangeSchema = z.object({
    currentPassword: z 
        .string()
        .trim()
        .min(1,'비밀번호를 입력해주세요')
        .min(8,'비밀번호는 8자 이상이어야 합니다.'),
     newPassword: z 
        .string()
        .trim()
        .min(1,'비밀번호를 입력해주세요')
        .min(8,'비밀번호는 8자 이상이어야 합니다.'),
     checkPassword: z 
        .string()
        .trim()
        .min(1,'비밀번호를 입력해주세요')
        .min(8,'비밀번호는 8자 이상이어야 합니다.'),
})
.superRefine((PW,er) =>{
if( PW.newPassword !== PW.checkPassword){
    er.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['checkPassword']
    })
}
if( PW.currentPassword == PW.newPassword){
    er.addIssue({
        code:z.ZodIssueCode.custom,
        message: '이전 비밀번호와 동일합니다.',
        path: ['newPassword']
    })
}
})

export type PWChangeSchema = z.infer<typeof pwChangeSchema>;