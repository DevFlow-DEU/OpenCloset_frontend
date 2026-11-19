import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

import { type ReactNode } from 'react';
import ProfileIcon from '../../assets/header_profile.svg?react';
import SearchIcon from '../../assets/header_search.svg?react';
import BackIcon from '../../assets/header_back.svg?react';
import Logo from '../Logo/Logo';

interface RootProps {
  children?: ReactNode;
  hasDivider?: boolean;
}

function LinkGroup({ children }: { children: ReactNode }) {
  return <span className={styles.linkGroup}>{children}</span>;
}

function MainTitle({ title }: { title: string }) {
  return <span className={styles.mainTitle}>{title}</span>;
}
function CenterTitle({ title }: { title: string }) {
  return (
    <span className={styles.headerContentCenter}>
      <span className={styles.centerTitle}>{title}</span>
    </span>
  );
}

function CenterLogo() {
  return (
    <span className={styles.headerContentCenter}>
      <Logo />
    </span>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <span className={styles.backButton}>
      <button type="button" onClick={() => navigate(-1)}>
        <BackIcon width={'12px'} height={'24px'} />
      </button>
    </span>
  );
}

function SearchLink() {
  return (
    <span>
      <Link to={'/Search'}>
        <SearchIcon width={24} />
      </Link>
    </span>
  );
}

function MyPageLink() {
  return (
    <span>
      <Link to={'/MyPage'}>
        <ProfileIcon width={24} />
      </Link>
    </span>
  );
}

function Root({ children, hasDivider = true }: RootProps) {
  return (
    <>
      <div className={styles.headerBody}>
        <div className={styles.headerContent}>{children}</div>

        {hasDivider ? <div className={styles.headerDivider} /> : null}
      </div>
      {/* headerBody가 position: fixed라 실제 문서 흐름엔 공간이 안 생겨서
          여기서 대신 비워줌. 높이는 index.css --app-header-height(헤더 본문 56px + 구분선 1px). */}
      <div className={styles.headerSpace} />
    </>
  );
}
export default function Header({ children }: { children: ReactNode }) {
  return children;
}

Header.Root = Root;
Header.CenterTitle = CenterTitle;
Header.CenterLogo = CenterLogo;
Header.MainTitle = MainTitle;
Header.MyPageLink = MyPageLink;
Header.SearchLink = SearchLink;
Header.BackButton = BackButton;
Header.Logo = Logo;
Header.LinkGroup = LinkGroup;
