import { useState } from "react"
import { SlArrowDown } from "react-icons/sl"
import List from "../Drawer/List"
import State, { type StateType } from "../State/State"
import styles from "./ChatState.module.css"

type ChatStatus = StateType | "대여가능"

type Props = {
    image: string
    name: string
    price: number
    status?: ChatStatus
    onClick?: () => void
    onStatusChange?: (status: string) => void
}

export default function ChatState({ image, name, price, status = "대여가능", onClick, onStatusChange }: Props) {
    const [listOpen, setListOpen] = useState(false)

    return (
        <>
            <div className={styles.item} onClick={onClick}>
                <img className={styles.image} src={image} alt="" />
                <div className={styles.content}>
                    <div className={styles.nameRow}>
                        <span className={styles.name}>{name}</span>
                        {status !== "대여가능" && <State state={status} />}
                    </div>
                    <div className={styles.priceRow}>
                        <span className={styles.price}>{price.toLocaleString()}원</span>
                        <span className={styles.slash}>/</span>
                        <span className={styles.perDay}>1Day</span>
                    </div>
                </div>
                <button
                    type="button"
                    className={styles.arrowButton}
                    onClick={e => { e.stopPropagation(); setListOpen(true) }}
                >
                    <SlArrowDown size={20} />
                </button>
            </div>

            {listOpen && (
                <List
                    type="status"
                    selected={status}
                    onSelect={s => { onStatusChange?.(s); setListOpen(false) }}
                    onClose={() => setListOpen(false)}
                />
            )}
        </>
    )
}
