import type { UseFormRegisterReturn, FieldError } from "react-hook-form"
import commonStyles from "./common.module.css"
import styles from "./Input.module.css"

type Props = {
    label?: string
    placeholder?: string
    type?: React.HTMLInputTypeAttribute
    register?: UseFormRegisterReturn
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    error?: FieldError
}

export default function Input({ label, placeholder, type, register, value, onChange, error }: Props) {
    return (
        <div className={styles.inputWrapper}>
            {label && <p className={commonStyles.inputLabel}>{label}</p>}
            <input
                className={commonStyles.inputField}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...register}
            />
            <div className={`${commonStyles.inputErrorBar}${error ? ` ${commonStyles.error}` : ""}`} />
            {error && <p className={commonStyles.inputErrorMessage}>{error.message}</p>}
        </div>
    )
}
