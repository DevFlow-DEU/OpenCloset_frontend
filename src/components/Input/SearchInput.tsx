import type { SetStateAction } from "react";
import styles from "./SearchInput.module.css";
import DeleteIcon from "../../assets/search_delete.svg?react";
interface Props {
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
}

export default function SearchInput({ text, setText }: Props) {
  return (
    <div className={styles.container}>
      <input
        type="search"
        inputMode="search"
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="검색어를 입력해주세요"
      />
      <button type="submit" className={styles.submit}></button>

      {text !== "" ? (
        <button className={styles.button} onClick={() => setText("")}>
          <DeleteIcon />
        </button>
      ) : null}
    </div>
  );
}
