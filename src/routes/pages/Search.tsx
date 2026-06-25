import styles from './Search.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SearchInput from '../../components/Input/SearchInput';
import RecentIcon from '../../assets/recent.svg?react';
import RecentDeleteIcon from '../../assets/recent_delete.svg?react';

const SEARCH_HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_LENGTH = 10;

function loadSearchHistory(): string[] {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((v) => typeof v === 'string')
      : [];
  } catch {
    return [];
  }
}

function saveSearchHistory(history: string[]) {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}

export default function Search() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] =
    useState<string[]>(loadSearchHistory);

  const addSearchWord = (word: string) => {
    const trimmed = word.trim();
    if (!trimmed) return;
    setSearchHistory((prev) => {
      const next = [trimmed, ...prev.filter((w) => w !== trimmed)].slice(
        0,
        MAX_HISTORY_LENGTH
      );
      saveSearchHistory(next);
      return next;
    });
  };

  const handleSearch = () => {
    const trimmed = searchText.trim();
    if (!trimmed) return;
    addSearchWord(trimmed);
    navigate(`/search/result/${encodeURIComponent(trimmed)}`);
  };

  const handleClearAll = () => {
    setSearchHistory([]);
    saveSearchHistory([]);
  };

  const handleDeleteWord = (word: string) => {
    setSearchHistory((prev) => {
      const next = prev.filter((w) => w !== word);
      saveSearchHistory(next);
      return next;
    });
  };

  return (
    <>
      <Header.Root hasDivider={false} hasNotch>
        <Header.BackButton />
        <form
          className={styles.searchForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <SearchInput text={searchText} setText={setSearchText} />
        </form>
      </Header.Root>
      <div className={styles.container}>
        <div className={styles.searchHistory}>
          <div className={styles.searchHistoryHeader}>
            최근 검색
            <button
              className={styles.clearHistoryButton}
              onClick={handleClearAll}
            >
              전체삭제
            </button>
          </div>
          <div className={styles.searchHistoryContainer}>
            {searchHistory.map((word) => (
              <div className={styles.searchHistoryWord} key={word}>
                <div className={styles.iconWordGroup}>
                  <RecentIcon />
                  {word}
                </div>
                <button
                  className={styles.historyDeleteButton}
                  onClick={() => handleDeleteWord(word)}
                >
                  <RecentDeleteIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
