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

type CheckResult = {
  available: boolean;
  message: string;
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
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
  const { onChange: registerOnChange, ...restRegister } = register;

  const handleNickCheck = async () => {
    try {
      const res = await axios.get<CheckResult>(
        `${import.meta.env.VITE_BACK_URL}/auth/check_nickname`,
        { params: { nickname: inputValue } }
      );
      setCheckResult(res.data);
    } catch (err) {
      const data = axios.isAxiosError(err) ? err.response?.data : null;
      setCheckResult({
        available: false,
        message: data?.message ?? '닉네임 확인에 실패했습니다.',
      });
    }
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
            setCheckResult(null);
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
        className={`${commonStyles.inputErrorBar}${
          error || checkResult?.available === false ? ` ${commonStyles.error}` : ''
        }`}
      />
      {error && (
        <p className={commonStyles.inputErrorMessage}>{error.message}</p>
      )}
      {!error && checkResult && (
        <p
          className={
            checkResult.available
              ? styles.checkAvailable
              : commonStyles.inputErrorMessage
          }
        >
          {checkResult.message}
        </p>
      )}
    </div>
  );
}
