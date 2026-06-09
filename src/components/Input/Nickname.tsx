import { useState } from 'react';
import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import axios from 'axios';
import commonStyles from './common.module.css';
import styles from './Nickname.module.css';

type Props = {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
  error?: FieldError;
  btnLabel?: string;
};

export default function Nickname({
  label,
  placeholder,
  type = 'text',
  register,
  error,
  btnLabel = '확인',
}: Props) {
  const [inputValue, setInputValue] = useState('');
  const { onChange: registerOnChange, ...restRegister } = register;

  const handleNickCheck = async () => {
    await axios.post(`${import.meta.env.VITE_BACK_URL}/경로`, {
      nickname: inputValue,
    });
  };

  return (
    <div className={styles.inputNickname}>
      {label && <p className={commonStyles.inputLabel}>{label}</p>}
      <div className={styles.inputNicknameRow}>
        <input
          className={`${commonStyles.inputField} ${styles.inputNicknameField}`}
          type={type}
          placeholder={placeholder}
          {...restRegister}
          onChange={(e) => {
            registerOnChange(e);
            setInputValue(e.target.value);
          }}
        />
        <button
          type="button"
          className={`${styles.inputNicknameButton}${inputValue.trim() ? ` ${styles.active}` : ''}`}
          disabled={!inputValue.trim()}
          onClick={handleNickCheck}
        >
          {btnLabel}
        </button>
      </div>
      <div
        className={`${commonStyles.inputErrorBar}${error ? ` ${commonStyles.error}` : ''}`}
      />
      {error && (
        <p className={commonStyles.inputErrorMessage}>{error.message}</p>
      )}
    </div>
  );
}
