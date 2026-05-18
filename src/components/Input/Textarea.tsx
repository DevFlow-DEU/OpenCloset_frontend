import type { UseFormRegisterReturn, FieldError } from "react-hook-form"
import commonStyles from "./common.module.css"
import styles from "./Textarea.module.css"

type Props = {
    label?: string
    placeholder?: string
    register: UseFormRegisterReturn
    rows?: number
    error?: FieldError
}

export default function Textarea({ label, placeholder, register, rows, error }: Props) {
    return (
        <div className={styles.inputTextarea}>
            {label && <p className={commonStyles.inputLabel}>{label}</p>}
            <textarea
                className={styles.inputTextareaField}
                placeholder={placeholder}
                rows={rows}
                {...register}
            />
            <div className={`${commonStyles.inputErrorBar}${error ? ` ${commonStyles.error}` : ""}`} />
            {error && <p className={commonStyles.inputErrorMessage}>{error.message}</p>}
        </div>
    )
}
