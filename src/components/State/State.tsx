import styles from "./State.module.css"

export type StateType = "예약중" | "대여중" | "대여완료"

const STATE_CLASS: Record<StateType, string> = {
    "예약중": styles.reserved,
    "대여중": styles.renting,
    "대여완료": styles.returned,
}

type Props = {
    state: StateType
}

export default function State({ state }: Props) {
    return (
        <span className={`${styles.badge} ${STATE_CLASS[state]}`}>
            {state}
        </span>
    )
}
