import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './EmailDomainInput.module.css';
interface Props {
  domainOptions: string[];
}

export function EmailDomainInput({ domainOptions }: Props) {
  const [domain, setDomain] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDomainSelect = (selectedDomain: string) => {
    setDomain(selectedDomain);
    setIsDropdownOpen(false);
  };
  return (
    <div className={styles.domainWrapper}>
      <div className={styles.domainInputContainer}>
        <input
          className={styles.domainInput}
          type='text'
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder='도메인'
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
                console.log('도메인');
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
