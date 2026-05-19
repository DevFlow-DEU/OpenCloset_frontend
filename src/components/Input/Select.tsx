import { useState } from "react"
import type { UseFormRegisterReturn, FieldError } from "react-hook-form"
import { SlArrowLeft } from "react-icons/sl"
import Size from "../Drawer/Size"
import List from "../Drawer/List"
import commonStyles from "./common.module.css"
import styles from "./Select.module.css"

type DrawerType = "size" | "category"

type Props = {
    label?: string
    placeholder?: string
    register: UseFormRegisterReturn
    drawer: DrawerType
    error?: FieldError
}

export default function Select({ label, placeholder, register, drawer, error }: Props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("")
    const { onChange: registerOnChange, ...restRegister } = register

    const drawerProps = {
        selected: selectedValue,
        onSelect: (val: string) => {
            setSelectedValue(val)
            registerOnChange({ target: { value: val, name: restRegister.name } } as React.ChangeEvent<HTMLInputElement>)
            setIsDrawerOpen(false)
        },
        onClose: () => setIsDrawerOpen(false),
    }

    return (
        <div className={styles.inputSelect}>
            {label && <p className={commonStyles.inputLabel}>{label}</p>}
            <input type="hidden" {...restRegister} />
            <button
                type="button"
                className={`${styles.inputSelectButton}${error ? ` ${styles.error}` : ""}`}
                onClick={() => setIsDrawerOpen(true)}
            >
                <span className={`${styles.inputSelectValue}${selectedValue ? ` ${styles.selected}` : ""}`}>
                    {selectedValue || placeholder || "선택해 주세요"}
                </span>
                <SlArrowLeft className={styles.inputSelectArrow} style={{ transform: "rotate(-90deg)" }} />
            </button>
            {isDrawerOpen && drawer === "size" && <Size {...drawerProps} />}
            {isDrawerOpen && drawer === "category" && <List type="category" {...drawerProps} />}
            {error && <p className={commonStyles.inputErrorMessage}>{error.message}</p>}
        </div>
    )
}
