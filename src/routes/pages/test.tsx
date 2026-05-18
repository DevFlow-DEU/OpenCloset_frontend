import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '../../components/Input/Input'
import Nickname from '../../components/Input/Nickname'
import Location from '../../components/Input/Location'
import Radio from '../../components/Input/Radio'
import Select from '../../components/Input/Select'
import Textarea from '../../components/Input/Textarea'

const schema = z.object({
    name: z.string().min(1, "빈칸을 채워 주세요"),
    nickname: z.string().min(1, "빈칸을 채워 주세요"),
    location: z.string().min(1, "빈칸을 채워 주세요"),
    coord: z.string().optional(),
    gender: z.string().min(1, "빈칸을 채워 주세요"),
    size: z.string().min(1, "빈칸을 채워 주세요"),
    description: z.string().min(1, "빈칸을 채워 주세요"),
})

type FormData = z.infer<typeof schema>

export default function Test() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: FormData) => {
        const message = [
            `이름: ${data.name}`,
            `닉네임: ${data.nickname}`,
            `거래 장소: ${data.location}`,
            `좌표: ${data.coord ?? '없음'}`,
            `성별: ${data.gender}`,
            `사이즈: ${data.size}`,
            `상세 설명: ${data.description}`,
        ].join('\n')
        alert(message)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>

            <Input
                label="이름"
                placeholder="이름을 입력하세요"
                register={register("name")}
                error={errors.name}
            />

            <Nickname
                label="닉네임"
                placeholder="닉네임을 입력하세요"
                register={register("nickname")}
                error={errors.nickname}
            />

            <Location
                label="거래 장소"
                placeholder="위치를 선택하세요"
                register={register("location")}
                coordRegister={register("coord")}
                error={errors.location}
                map="detailedMap"
            />

            <Radio
                label="성별"
                options={["남성", "여성", "공용"]}
                register={register("gender")}
                error={errors.gender}
            />

            <Select
                label="사이즈"
                placeholder="사이즈를 선택하세요"
                register={register("size")}
                error={errors.size}
                drawer="size"
            />

            <Textarea
                label="상세 설명"
                placeholder="상세 설명을 입력하세요"
                rows={4}
                register={register("description")}
                error={errors.description}
            />

            <button type="submit">전송하기</button>
        </form>
    )
}
