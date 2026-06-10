import * as Popover from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker, type DateRange } from 'react-day-picker';
import commonStyles from './common.module.css';
import styles from './DateRange.module.css';

type Props = {
  label?: string;
  placeholder?: string;
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  error?: string;
};

export default function DateRange({
  label,
  placeholder = '날짜를 선택하세요',
  value,
  onChange,
  error,
}: Props) {
  const displayValue = value?.from
    ? value.to
      ? `${format(value.from, 'yyyy.MM.dd')} ~ ${format(value.to, 'yyyy.MM.dd')}`
      : format(value.from, 'yyyy.MM.dd')
    : null;

  return (
    <div className={styles.wrapper}>
      {label && <p className={commonStyles.inputLabel}>{label}</p>}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`${commonStyles.inputField} ${styles.trigger}`}
          >
            <span className={displayValue ? styles.value : styles.placeholder}>
              {displayValue ?? placeholder}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className={styles.popoverContent}
            align="start"
            sideOffset={4}
          >
            <DayPicker
              mode="range"
              defaultMonth={value?.from}
              selected={value}
              onSelect={onChange}
              locale={ko}
              numberOfMonths={1}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <div
        className={`${commonStyles.inputErrorBar}${error ? ` ${commonStyles.error}` : ''}`}
      />
      {error && <p className={commonStyles.inputErrorMessage}>{error}</p>}
    </div>
  );
}
