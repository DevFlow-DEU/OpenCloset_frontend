import { useState } from "react"
import type { UseFormRegisterReturn, FieldError } from "react-hook-form"
import { Button } from "../Button/Button"
import { MdGpsFixed } from "react-icons/md"
import Map from "../Map/Map"
import DetailedMap from "../Map/DetailedMap"
import commonStyles from "./common.module.css"
import styles from "./Location.module.css"

type LocationDrawer = "map" | "detailedMap"

type Props = {
    label?: string
    placeholder?: string
    register: UseFormRegisterReturn
    coordRegister?: UseFormRegisterReturn
    map: LocationDrawer
    error?: FieldError
}

export default function Location({ label, placeholder, register, coordRegister, map, error }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [displayValue, setDisplayValue] = useState("")
    const { onChange: registerOnChange, ...restRegister } = register
    const coordRegisterOnChange = coordRegister?.onChange

    const handleSelect = (text: string) => {
        setDisplayValue(text)
        registerOnChange({ target: { value: text, name: restRegister.name } } as React.ChangeEvent<HTMLInputElement>)
        setIsOpen(false)
    }

    const handleSelectWithCoord = (text: string, coord: string) => {
        setDisplayValue(text)
        registerOnChange({ target: { value: text, name: restRegister.name } } as React.ChangeEvent<HTMLInputElement>)
        if (coordRegisterOnChange) {
            coordRegisterOnChange({ target: { value: coord, name: coordRegister!.name } } as React.ChangeEvent<HTMLInputElement>)
        }
        setIsOpen(false)
    }

    return (
        <div className={styles.inputLocation}>
            {label && <p className={commonStyles.inputLabel}>{label}</p>}
            <input
                className={commonStyles.inputField}
                placeholder={placeholder}
                value={displayValue}
                readOnly
                onClick={() => setIsOpen(true)}
                {...restRegister}
            />
            <div className={`${commonStyles.inputErrorBar}${error ? ` ${commonStyles.error}` : ""}`} />
            {error && <p className={commonStyles.inputErrorMessage}>{error.message}</p>}
            <div className="space-28px"></div>
            <Button variant="secondary" type="button" onClick={() => setIsOpen(true)}>
                <MdGpsFixed size={18} />
                위치 입력
            </Button>
            {coordRegister && <input type="hidden" {...coordRegister} />}
            {isOpen && map === "map" && (
                <Map onSelect={handleSelect} onClose={() => setIsOpen(false)} />
            )}
            {isOpen && map === "detailedMap" && (
                <DetailedMap onSelect={handleSelect} onSelectWithCoord={handleSelectWithCoord} onClose={() => setIsOpen(false)} />
            )}
        </div>
    )
}
