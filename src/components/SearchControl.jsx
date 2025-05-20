export default function SearchControl({ backButtonColor }) {
  return (
    <div className={styles['header-item']}>
      <Link to={'/'} className={styles['header-button']}>
        <ChevronLeft size={35} color={backButtonColor} />
      </Link>
      <div className={styles['search-bar']}>
        <input
          type='search'
          name=''
          id=''
          placeholder='검색어를 입력해주세요'
        />
        <SearchIcon width={'15.61px'} height={'16.07px'} color={'#8d8d8d'} />
      </div>
    </div>
  );
}
