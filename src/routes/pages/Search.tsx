import styles from './Search.module.css';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import SearchInput from '../../components/Input/SearchInput';
import RecentIcon from '../../assets/recent.svg?react';
import RecentDeleteIcon from '../../assets/recent_delete.svg?react';
export default function Search() {
  const [searchText, setSearchText] = useState('');
  return (
    <>
      <Header.Root hasDivider={false} hasNotch>
        <Header.BackButton />
        <SearchInput text={searchText} setText={setSearchText} />
      </Header.Root>
      <div className={styles.container}>
        <div className={styles.searchHistory}>
          <div className={styles.searchHistoryHeader}>
            최근 검색
            <button className={styles.clearHistoryButton} onClick={() => {}}>
              전체삭제
            </button>
          </div>
          <div className={styles.searchHistoryContainer}>
            <div className={styles.searchHistoryWord}>
              <div className={styles.iconWordGroup}>
                <RecentIcon />
                오픈클로젯
              </div>
              <button className={styles.historyDeleteButton}>
                <RecentDeleteIcon />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.searchRank}></div>
      </div>
    </>
  );
}
