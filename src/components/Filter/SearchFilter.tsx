import { useState } from "react"
import { BsSliders } from "react-icons/bs"
import { SlArrowLeft } from "react-icons/sl"
import Filter, { type FilterValue } from "../Drawer/Filter"
import styles from "./SearchFilter.module.css"

type Tab = "성별" | "가격" | "카테고리" | "사이즈" | "기간"

const TABS: Tab[] = ["성별", "가격", "카테고리", "사이즈", "기간"]

type Chip = { id: string; label: string; onRemove: () => void }

function buildChips(f: FilterValue, patch: (p: Partial<FilterValue>) => void): Chip[] {
    const chips: Chip[] = []

    if (f.gender)
        chips.push({ id: "gender", label: f.gender, onRemove: () => patch({ gender: "" }) })

    if (f.priceMin || f.priceMax) {
        const label = [f.priceMin && `${f.priceMin}원`, f.priceMax && `${f.priceMax}원`]
            .filter(Boolean).join(" ~ ")
        chips.push({ id: "price", label, onRemove: () => patch({ priceMin: "", priceMax: "" }) })
    }

    if (f.category)
        chips.push({ id: "category", label: f.category, onRemove: () => patch({ category: "" }) })

    f.sizes.forEach(s =>
        chips.push({ id: `size_${s}`, label: s, onRemove: () => patch({ sizes: f.sizes.filter(x => x !== s) }) })
    )

    if (f.dateStart || f.dateEnd) {
        const label = [f.dateStart, f.dateEnd].filter(Boolean).join(" ~ ")
        chips.push({ id: "date", label, onRemove: () => patch({ dateStart: "", dateEnd: "" }) })
    }

    return chips
}

function isTabActive(tab: Tab, f: FilterValue): boolean {
    switch (tab) {
        case "성별":    return !!f.gender
        case "가격":    return !!(f.priceMin || f.priceMax)
        case "카테고리": return !!f.category
        case "사이즈":  return f.sizes.length > 0
        case "기간":    return !!(f.dateStart || f.dateEnd)
    }
}

type Props = {
    value: FilterValue
    onChange: (value: FilterValue) => void
}

export default function SearchFilter({ value, onChange }: Props) {
    const [openTab, setOpenTab] = useState<Tab | "all" | null>(null)

    const updateFilter = (patch: Partial<FilterValue>) => onChange({ ...value, ...patch })

    const chips = buildChips(value, updateFilter)

    return (
        <div className={styles.filterBar}>
            <div className={styles.topRow}>
                <button
                    type="button"
                    className={styles.sliderButton}
                    onClick={() => setOpenTab("all")}
                >
                    <BsSliders size={16} />
                </button>

                {TABS.map(tab => (
                    <button
                        key={tab}
                        type="button"
                        className={`${styles.filterButton}${isTabActive(tab, value) ? ` ${styles.active}` : ""}`}
                        onClick={() => setOpenTab(tab)}
                    >
                        {tab}
                        <SlArrowLeft size={10} style={{ transform: "rotate(-90deg)", flexShrink: 0 }} />
                    </button>
                ))}
            </div>

            {chips.length > 0 && (
                <div className={styles.chipsRow}>
                    {chips.map(chip => (
                        <button
                            key={chip.id}
                            type="button"
                            className={styles.chip}
                            onClick={chip.onRemove}
                        >
                            {chip.label} ×
                        </button>
                    ))}
                </div>
            )}

            {openTab !== null && (
                <Filter
                    initialValue={value}
                    initialTab={openTab === "all" ? undefined : openTab}
                    onApply={(v) => { onChange(v); setOpenTab(null) }}
                    onClose={() => setOpenTab(null)}
                />
            )}
        </div>
    )
}
