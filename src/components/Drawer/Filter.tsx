import { useState } from "react"
import { format } from "date-fns"
import { type DateRange } from "react-day-picker"
import { Button } from "../Button/Button"
import FilterDatePicker from "./FilterDatePicker"
import styles from "./Filter.module.css"

const formatComma = (v: string) => v ? Number(v).toLocaleString() : ""
const stripComma = (v: string) => v.replace(/[^0-9]/g, "")

type Tab = "성별" | "가격" | "카테고리" | "사이즈" | "기간"

const TABS: Tab[] = ["성별", "가격", "카테고리", "사이즈", "기간"]

const GENDER_OPTIONS = ["남성", "여성", "공용"]
const CATEGORY_OPTIONS = ["상의", "하의", "원피스", "아우터", "신발", "가방", "악세사리"]
const SIZE_SECTIONS = [
    { label: "표준 사이즈", options: ["Free", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"] },
    { label: "신발 사이즈", options: ["220 이하", "225", "230", "235", "240", "245", "250", "255", "260", "265", "270", "275", "280", "285"] },
]

export type FilterValue = {
    gender: string
    priceMin: string
    priceMax: string
    category: string
    sizes: string[]
    dateStart: string
    dateEnd: string
}

type Props = {
    onApply: (filter: FilterValue) => void
    onClose: () => void
    initialValue?: Partial<FilterValue>
    initialTab?: Tab
}

export default function Filter({ onApply, onClose, initialValue = {}, initialTab }: Props) {
    const [activeTab, setActiveTab] = useState<Tab>(initialTab ?? "성별")
    const [gender, setGender] = useState(initialValue.gender || "")
    const [priceMin, setPriceMin] = useState(initialValue.priceMin || "")
    const [priceMax, setPriceMax] = useState(initialValue.priceMax || "")
    const [category, setCategory] = useState(initialValue.category || "")
    const [sizes, setSizes] = useState<string[]>(initialValue.sizes || [])
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
        initialValue.dateStart ? {
            from: new Date(initialValue.dateStart),
            to: initialValue.dateEnd ? new Date(initialValue.dateEnd) : undefined,
        } : undefined
    )

    const toggleSize = (size: string) =>
        setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])

    const handleApply = () => {
        onApply({
            gender, priceMin, priceMax, category, sizes,
            dateStart: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "",
            dateEnd: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "",
        })
        onClose()
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={e => e.stopPropagation()}>
                <p className={styles.title}>필터</p>
                <div className={styles.tabs}>
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            type="button"
                            className={`${styles.tab}${activeTab === tab ? ` ${styles.activeTab}` : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className={styles.body}>
                    {activeTab === "성별" && (
                        <div className={styles.radioGroup}>
                            {GENDER_OPTIONS.map(opt => (
                                <label key={opt} className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={opt}
                                        checked={gender === opt}
                                        onChange={() => setGender(opt)}
                                        className={styles.radioInput}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    )}

                    {activeTab === "가격" && (
                        <div className={styles.rangeRow}>
                            <div className={styles.rangeField}>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="최소 가격"
                                    value={formatComma(priceMin)}
                                    onChange={e => setPriceMin(stripComma(e.target.value))}
                                    className={styles.rangeInput}
                                />
                                <span className={styles.rangeUnit}>원</span>
                            </div>
                            <span className={styles.rangeSep}>~</span>
                            <div className={styles.rangeField}>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="최대 가격"
                                    value={formatComma(priceMax)}
                                    onChange={e => setPriceMax(stripComma(e.target.value))}
                                    className={styles.rangeInput}
                                />
                                <span className={styles.rangeUnit}>원</span>
                            </div>
                        </div>
                    )}

                    {activeTab === "카테고리" && (
                        <div className={styles.radioGroup}>
                            {CATEGORY_OPTIONS.map(opt => (
                                <label key={opt} className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="category"
                                        value={opt}
                                        checked={category === opt}
                                        onChange={() => setCategory(opt)}
                                        className={styles.radioInput}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    )}

                    {activeTab === "사이즈" && (
                        <div className={styles.sizeSections}>
                            {SIZE_SECTIONS.map(section => (
                                <div key={section.label}>
                                    <p className={styles.sectionLabel}>{section.label}</p>
                                    <div className={styles.radioGroup}>
                                        {section.options.map(opt => (
                                            <label key={opt} className={styles.radioLabel}>
                                                <input
                                                    type="checkbox"
                                                    value={opt}
                                                    checked={sizes.includes(opt)}
                                                    onChange={() => toggleSize(opt)}
                                                    className={styles.checkboxInput}
                                                />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "기간" && (
                        <FilterDatePicker value={dateRange} onChange={setDateRange} />
                    )}
                </div>

                <div className={styles.footer}>
                    <Button variant="primary" type="button" onClick={handleApply}>
                        적용
                    </Button>
                </div>
            </div>
        </div>
    )
}
