import styles from "./Header.module.css";
import "../Fonts.css";
import { Link } from "react-router-dom";

import ProfileIcon from "../../assets/header_profile.svg?react";
import SearchIcon from "../../assets/header_search.svg?react";
import BackIcon from "../../assets/header_back.svg?react";
import Logo from "../../assets/header_logo.svg?react";
interface Props {
  title?: string;
  hasNotch: boolean;
}

export default function Header({ title }: Props) {
  return (
    <>
      <div className={styles.headerBody}>
        <div className={styles.appNotch}>
          <div className={styles.camera}></div>
        </div>
        {/* 노치 부분은 앱으로 만들면 없애야 함 */}
        <div className={styles.appBar}>
          <span>
            <Link to={".."}>
              <BackIcon />
            </Link>
          </span>
          <span className={styles.appBarCenter}>
            {title ? (
              <span className={styles.headerTitle}>{title}</span>
            ) : (
              <Logo />
            )}
          </span>
          <span>
            <Link to={"/Search"}>
              <SearchIcon width={24} />
            </Link>
            <Link to={"/MyPage"}>
              <ProfileIcon width={24} />
            </Link>
          </span>
        </div>
        <div className={styles.headerBar}></div>
      </div>
      <div className={styles.headerSpace}></div>
    </>
  );
}
