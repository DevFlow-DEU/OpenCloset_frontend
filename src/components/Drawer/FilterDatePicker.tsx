import * as Popover from "@radix-ui/react-popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { DayPicker, type DateRange } from "react-day-picker"
import styles from "./FilterDatePicker.module.css"

type Props = {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
};

export default function FilterDatePicker({ value, onChange }: Props) {
  const label = value?.from
    ? value.to
      ? `${format(value.from, 'yyyy.MM.dd')} ~ ${format(value.to, 'yyyy.MM.dd')}`
      : format(value.from, 'yyyy.MM.dd')
    : null;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className={styles.trigger}>
          <CalendarIcon size={16} className={styles.icon} />
          <span
            className={label ? styles.triggerValue : styles.triggerPlaceholder}
          >
            {label ?? '날짜를 선택하세요'}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={styles.popoverContent}
          align="start"
          sideOffset={8}
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
  );
}
