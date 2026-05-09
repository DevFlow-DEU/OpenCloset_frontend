import { Link, useLocation } from "react-router-dom";
import styles from "./NavigationBar.module.css";

import SaveIconOutline from "../../assets/save_outline.svg?react";
import ProfileIconOutline from "../../assets/profile_outline.svg?react";
import SaveIcon from "../../assets/save.svg?react";
import ProfileIcon from "../../assets/profile.svg?react";
import { MdAddCircleOutline } from "react-icons/md";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipses,
} from "react-icons/io5";

const ICON_SIZE = {
  size: 24,
  width: 24,
  height: 24,
};

interface Props {
  className?: string;
}

export default function NavigationBar({ className }: Props) {
  const pathname = useLocation().pathname;
  return (
    <div className={`${styles.navigationBar} ${className ?? ""}`}>
      <Link to={"/"}>
        {pathname === "/" ? (
          <GoHomeFill {...ICON_SIZE} />
        ) : (
          <GoHome {...ICON_SIZE} />
        )}
        홈
      </Link>
      <Link to={"/chat"}>
        {pathname === "/chat" ? (
          <IoChatbubbleEllipses {...ICON_SIZE} />
        ) : (
          <IoChatbubbleEllipsesOutline {...ICON_SIZE} />
        )}
        채팅
      </Link>
      <Link to={"/add_product"}>
        <MdAddCircleOutline {...ICON_SIZE} />
        상품등록
      </Link>
      <Link to={"/save"}>
        {pathname === "/save" ? (
          <SaveIcon {...ICON_SIZE} />
        ) : (
          <SaveIconOutline {...ICON_SIZE} />
        )}
        찜
      </Link>
      <Link to="/MyPage">
        {pathname === "/MyPage" ? (
          <ProfileIcon {...ICON_SIZE} />
        ) : (
          <ProfileIconOutline {...ICON_SIZE} />
        )}
        내정보
      </Link>
    </div>
  );
}
