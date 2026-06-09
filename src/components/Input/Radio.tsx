import { useState } from 'react';
import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import commonStyles from './common.module.css';
import styles from './Radio.module.css';

type Option = string | { value: string; label: string };

const getOpt = (opt: Option): { value: string; label: string } => ({
  value: typeof opt === 'string' ? opt : opt.value,
  label: typeof opt === 'string' ? opt : opt.label,
});

type Props = {
  label?: string;
  options: Option[];
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export default function Radio({ label, options, register, error }: Props) {
  const [selectedValue, setSelectedValue] = useState('');
  const { onChange: registerOnChange, ...restRegister } = register;

  return (
    <div className={styles.inputRadio}>
      {label && <p className={commonStyles.inputLabel}>{label}</p>}
      <input type="hidden" {...restRegister} />
      <div className={styles.inputRadioGroup}>
        {options.map((opt: Option) => {
          const { value, label: optLabel } = getOpt(opt);
          return (
            <button
              key={value}
              type="button"
              className={[
                styles.inputRadioButton,
                selectedValue === value ? styles.active : '',
                error ? styles.error : '',
              ].join(' ')}
              onClick={() => {
                setSelectedValue(value);
                registerOnChange({
                  target: { value, name: restRegister.name },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
      {error && (
        <p className={commonStyles.inputErrorMessage}>{error.message}</p>
      )}
    </div>
  );
}
