import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './EmailDomainInput.module.css';
import type { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';
import { SignUpSchema } from '../routes/pages/SignUp/signUpSchema';
type SignUpForm = z.infer<typeof SignUpSchema>;
interface Props {
  domainOptions: string[];
  error: boolean;
  register: () => UseFormRegisterReturn;
  setValue: UseFormSetValue<SignUpForm>;
}

export function EmailDomainInput({
  domainOptions,
  register,
  setValue,
  error,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDomainSelect = (selectedDomain: string) => {
    setValue('emailDomain', selectedDomain, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setIsDropdownOpen(false);
  };
  return (
    <div className={styles.domainWrapper}>
      <div className={styles.domainInputContainer}>
        <input
          className={`${error ? styles.inputOnError : styles.input} ${
            styles.domainInput
          }`}
          type='text'
          placeholder='도메인'
          {...register()}
        />

        <button
          className={styles.dropdownToggleBtn}
          type='button'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <ChevronDown
            size={20}
            strokeWidth={2}
            className={`${styles.dropdownArrow} ${
              isDropdownOpen ? styles.arrowOpen : ''
            }`}
          />
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {domainOptions.map((option) => (
            <button
              className={styles.dropdownItem}
              key={option}
              type='button'
              onClick={() => {
                handleDomainSelect(option);
              }}
            >
              {option}
            </button>
          ))}
          <div
            className={styles.overlay}
            onClick={() => setIsDropdownOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
