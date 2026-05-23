import styles from "./Header.module.css";
import { Link } from "react-router-dom";

import { type ReactNode } from "react";
import ProfileIcon from "../../assets/header_profile.svg?react";
import SearchIcon from "../../assets/header_search.svg?react";
import BackIcon from "../../assets/header_back.svg?react";
import Logo from "../Logo/Logo";

/*
  버튼, 로고 분리요망
*/

interface RootProps {
  children?: ReactNode;
  hasNotch?: boolean;
}

function LinkGroup({ children }: { children: ReactNode }) {
  return <span className={styles.linkGroup}>{children}</span>;
}

function Title({ title }: { title: string }) {
  return (
    <span className={styles.appBarCenter}>
      <span className={styles.headerTitle}>{title}</span>
    </span>
  );
}

function BackButton() {
  return (
    <span>
      <Link to={".."}>
        <BackIcon />
      </Link>
    </span>
  );
}

function SearchLink() {
  return (
    <span>
      <Link to={"/Search"}>
        <SearchIcon width={24} />
      </Link>
    </span>
  );
}

function MyPageLink() {
  return (
    <span>
      <Link to={"/MyPage"}>
        <ProfileIcon width={24} />
      </Link>
    </span>
  );
}

function Root({ hasNotch, children }: RootProps) {
  return (
    <>
      <div className={styles.headerBody}>
        {hasNotch ? (
          <div className={styles.appNotch}>
            <div className={styles.camera}></div>
          </div>
        ) : null}
        {/* 노치 부분은 앱으로 만들면 없애야 함 */}
        <div className={styles.appBar}>{children}</div>
        <div className={styles.headerBar} />
      </div>
    </>
  );
}
export default function Header({ children }: { children: ReactNode }) {
  return children;
}

Header.Root = Root;
Header.Title = Title;
Header.MyPageLink = MyPageLink;
Header.SearchLink = SearchLink;
Header.BackButton = BackButton;
Header.Logo = Logo;
Header.LinkGroup = LinkGroup;
