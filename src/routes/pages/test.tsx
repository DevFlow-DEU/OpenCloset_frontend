import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '../../components/Input/Input'

const schema = z.object({
    name: z.string().min(1, "빈칸을 채워 주세요"),
    nickname: z.string().min(1, "빈칸을 채워 주세요"),
    location: z.string().min(1, "빈칸을 채워 주세요"),
    gender: z.string().min(1, "빈칸을 채워 주세요"),
    size: z.string().min(1, "빈칸을 채워 주세요"),
    description: z.string().min(1, "빈칸을 채워 주세요"),
})

type FormData = z.infer<typeof schema>

export default function Test() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: FormData) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>

            {/* 1. default */}
            <Input
                variant="default"
                label="이름"
                placeholder="이름을 입력하세요"
                register={register("name")}
                error={errors.name}
            />

            {/* 2. nick */}
            <Input
                variant="nick"
                label="닉네임"
                placeholder="닉네임을 입력하세요"
                register={register("nickname")}
                error={errors.nickname}
            />

            {/* 3. location */}
            <Input
                variant="location"
                label="거래 장소"
                placeholder="위치를 선택하세요"
                register={register("location")}
                error={errors.location}
                modalContent={({ onSelect, onClose }) => (
                    <div style={{ border: '1px solid #ccc', padding: '16px' }}>
                        <p>위치 모달</p>
                        <button onClick={() => onSelect("서울시 강남구")}>강남구 선택</button>
                        <button onClick={onClose}>닫기</button>
                    </div>
                )}
            />

            {/* 4. radio */}
            <Input
                variant="radio"
                label="성별"
                options={["남성", "여성", "공용"]}
                register={register("gender")}
                error={errors.gender}
            />

            {/* 5. select */}
            <Input
                variant="select"
                label="사이즈"
                placeholder="사이즈를 선택하세요"
                register={register("size")}
                error={errors.size}
                drawerType="size"
            />

            {/* 6. textarea */}
            <Input
                variant="textarea"
                label="상세 설명"
                placeholder="상세 설명을 입력하세요"
                rows={4}
                register={register("description")}
                error={errors.description}
            />

            <button type="submit">전송</button>
        </form>
    )
}
