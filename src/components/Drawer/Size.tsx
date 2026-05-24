import { useState } from "react"
import { Button } from "../Button/Button"
import Input from "../Input/Input"
import type { DrawerProps } from "./types"
import styles from "./Size.module.css"

const SIZE_SECTIONS = [
    { label: "공용 사이즈", options: ["Free", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"] },
    { label: "한국 사이즈", options: ["80", "85", "90", "95", "100", "105", "110", "115"] },
    { label: "유럽 사이즈", options: ["32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56"] },
    { label: "신발 사이즈", options: ["220 이하", "225", "230", "235", "240", "245", "250", "255", "260", "265", "270", "275", "280", "285"] },
]

export default function Size({ selected, onSelect, onClose }: DrawerProps) {
    const [pendingValue, setPendingValue] = useState(selected || "")
    const [customSize, setCustomSize] = useState("")

    const handleButtonClick = (val: string) => {
        setPendingValue(val)
        setCustomSize("")
    }

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomSize(e.target.value)
        setPendingValue(e.target.value)
    }

    const handleConfirm = () => {
        if (pendingValue) onSelect(pendingValue)
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={e => e.stopPropagation()}>




                <div className={styles.body}>
                    {SIZE_SECTIONS.map(section => (
                        <div key={section.label}>
                            <p className={styles.sectionLabel}>{section.label}</p>
                            <div className={styles.grid}>
                                {section.options.map(opt => (
                                    <Button
                                        key={opt}
                                        variant="secondary"
                                        type="button"
                                        className={`${styles.optionButton}${pendingValue === opt ? ` ${styles.active}` : ""}`}
                                        onClick={() => handleButtonClick(opt)}
                                    >
                                        {opt}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div>

                        <Input
                            label="기타 사이즈"
                            placeholder="기타 사이즈 입력"
                            value={customSize}
                            onChange={handleCustomChange}
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <Button
                        variant="primary"
                        type="button"
                        disabled={!pendingValue}
                        onClick={handleConfirm}
                    >
                        확인
                    </Button>
                </div>
            </div>
        </div>
    )
}
