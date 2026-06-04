import styles from "./Header.module.css";
import { Link } from "react-router-dom";

import { type ReactNode } from "react";
import ProfileIcon from "../../assets/header_profile.svg?react";
import SearchIcon from "../../assets/header_search.svg?react";
import BackIcon from "../../assets/header_back.svg?react";
import Logo from "../Logo/Logo";

interface RootProps {
  children?: ReactNode;
  hasNotch?: boolean;
  hasCamera?: boolean;
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

function Root({ hasNotch, hasCamera, children }: RootProps) {
  return (
    <>
      <div className={styles.headerBody}>
        {hasNotch ? (
          <div className={styles.notchArea}>
            {hasCamera ? <div className={styles.cameraArea} /> : null}
          </div>
        ) : null}
        {/* 노치 부분은 앱으로 만들면 없애야 함 */}
        <div className={styles.headerContent}>{children}</div>
        <div className={styles.headerDivider} />
      </div>
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
