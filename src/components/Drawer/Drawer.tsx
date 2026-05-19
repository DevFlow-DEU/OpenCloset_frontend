import "./Drawer.css"

export type DrawerType = "size" | "location" | "category"

type Props = {
    type: DrawerType
    selected?: string
    onSelect: (value: string) => void
    onClose: () => void
}

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"]
const CATEGORY_OPTIONS = ["상의", "하의", "아우터", "원피스", "신발", "가방"]

function DrawerContent({ type, selected, onSelect }: Pick<Props, "type" | "selected" | "onSelect">) {
    if (type === "size") {
        return (
            <>
                {SIZE_OPTIONS.map(s => (
                    <button key={s} className={`drawer-item${selected === s ? " active" : ""}`} onClick={() => onSelect(s)}>
                        {s}
                    </button>
                ))}
            </>
        )
    }

    if (type === "category") {
        return (
            <>
                {CATEGORY_OPTIONS.map(c => (
                    <button key={c} className={`drawer-item${selected === c ? " active" : ""}`} onClick={() => onSelect(c)}>
                        {c}
                    </button>
                ))}
            </>
        )
    }

    if (type === "location") {
        return (
            <div className="drawer-location">
                <p>위치 검색 (추후 구현)</p>
            </div>
        )
    }

    return null
}

const DRAWER_TITLE: Record<DrawerType, string> = {
    size: "사이즈 선택",
    location: "거래 장소",
    category: "카테고리",
}

export default function Drawer({ type, selected, onSelect, onClose }: Props) {
    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="drawer" onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <span className="drawer-title">{DRAWER_TITLE[type]}</span>
                    <button className="drawer-close" onClick={onClose}>✕</button>
                </div>
                <div className="drawer-body">
                    <DrawerContent type={type} selected={selected} onSelect={onSelect} />
                </div>
            </div>
        </div>
    )
}
