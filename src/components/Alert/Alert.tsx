import checkSrc from "../../assets/icon/Alert/check.svg"
import warningSrc from "../../assets/icon/Alert/warning.svg"
import styles from "./Alert.module.css"

type IconType = "check" | "warning"
type ButtonType = "confirm" | "delete"

type Props = {
    icon: IconType
    title: string
    description: string
    buttons: ButtonType
    onConfirm: () => void
    onCancel?: () => void
}

const ICONS: Record<IconType, string> = {
    check: checkSrc,
    warning: warningSrc,
}

export default function Alert({ icon, title, description, buttons, onConfirm, onCancel }: Props) {
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <img src={ICONS[icon]} alt="" className={styles.icon} />
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.buttonArea}>
                    {buttons === "confirm" ? (
                        <button className={`${styles.button} ${styles.confirmButton}`} type="button" onClick={onConfirm}>확인</button>
                    ) : (
                        <>
                            <button className={`${styles.button} ${styles.deleteButton}`} type="button" onClick={onConfirm}>탈퇴하기</button>
                            <button className={`${styles.button} ${styles.cancelButton}`} type="button" onClick={onCancel}>취소</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
